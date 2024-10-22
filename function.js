// Initialize Supabase client with your API URL and Key
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

// Since you're using the UMD build, 'supabase' is globally available on the window object.
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Function to format the date as dd/mm/yyyy
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Get day and pad with 0 if necessary
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Get month (0-indexed) and pad with 0 if necessary
    const year = d.getFullYear();  // Get full year

    const hours = String(d.getHours()).padStart(2, '0');  // Get hours and pad with 0 if necessary
    const minutes = String(d.getMinutes()).padStart(2, '0');  // Get minutes and pad with 0 if necessary
    const seconds = String(d.getSeconds()).padStart(2, '0');  // Get seconds and pad with 0 if necessary

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;  // Return in dd/mm/yyyy hh:mm:ss format
}

function highlightText(text, searchQuery) {
    if (!searchQuery) return text;  // If no search query, return the original text

    // Create a regular expression to find the search term (case-insensitive)
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    
    // Replace the matched term with a <span> that wraps the matched part
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// Fetch and display notes from the database, optionally filtered by search query
async function fetchNotes(searchQuery = '') {
    let { data, error } = await supabase
        .from('Note')  // Replace with your actual table name
        .select('*')
        .order('created_at', { ascending: false });  // Order by creation date

    if (error) {
        console.error('Error fetching data:', error);
        document.getElementById('notes').innerHTML = 'Error fetching data';
    } else {
        // Filter notes by search query if provided
        const filteredNotes = data.filter(note => {
            return note.content.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Display the filtered or unfiltered notes
        const result = filteredNotes.map(note => {
            const formattedDate = formatDate(note.created_at);  // Format date to dd/mm/yyyy hh:mm:ss

            // Highlight the search term in the content
            const highlightedContent = highlightText(note.content, searchQuery);

            return `<div class="note" id="note-${note.id}">
                        <p><strong>ID:</strong> ${note.id}</p>
                        <p><strong>Created At:</strong> ${formattedDate}</p>
                        <p>${highlightedContent}</p>  <!-- Display highlighted content -->
                        <button class="delete-btn btn btn-danger" data-id="${note.id}">Delete Note</button>
                    </div>`;
        }).join('');
        document.getElementById('notes').innerHTML = result;

        // Attach delete event listener to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const noteId = this.getAttribute('data-id');
                removeNote(noteId);  // Call removeNote function when clicked
            });
        });
    }
}

// Handle note submission
document.getElementById('noteForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const noteContent = document.getElementById('noteInput').value;

    if (noteContent.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    // Insert the new note into the database
    let { data, error } = await supabase
        .from('Note')  // Replace with your actual table name
        .insert([{ content: noteContent }]);

    if (error) {
        console.error('Error adding note:', error);
        alert('Error adding note. Please try again.');
    } else {
        // Clear the input field
        document.getElementById('noteInput').value = '';
        // Refresh the notes list
        fetchNotes();
    }
});

// Handle note removal
async function removeNote(id) {
    const { error } = await supabase
        .from('Note')  // Replace with your actual table name
        .delete()
        .eq('id', id);  // Delete the note with the matching ID

    if (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note. Please try again.');
    } else {
        // Remove the note from the DOM
        const noteElement = document.getElementById(`note-${id}`);
        if (noteElement) {
            noteElement.remove();
        }
    }
}

// Listen to the search form submit event
document.querySelector('form[role="search"]').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting
    const searchQuery = document.querySelector('input[type="search"]').value;  // Get the search query
    fetchNotes(searchQuery);  // Fetch notes with the search query and highlight results
});

// Initial fetch to display all notes when the page loads
fetchNotes();