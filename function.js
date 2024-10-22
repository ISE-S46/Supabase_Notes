// Initialize Supabase client with your API URL and Key
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

// Since you're using the UMD build, 'supabase' is globally available on the window object.
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Fetch and display notes from the database
async function fetchNotes() {
    let { data, error } = await supabase
        .from('Note')  // Replace with your actual table name
        .select('*')
        .order('created_at', { ascending: false });  // Order by creation date

    if (error) {
        console.error('Error fetching data:', error);
        document.getElementById('notes').innerHTML = 'Error fetching data';
    } else {
        // Display the fetched notes with a delete button
        const result = data.map(note => {
            return `<div class="note" id="note-${note.id}">
                        <p><strong>ID:</strong> ${note.id}</p>
                        <p><strong>Created At:</strong> ${new Date(note.created_at).toLocaleString()}</p>
                        <p>${note.content}</p>
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

// Fetch and display notes when the page loads
fetchNotes();