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
        // Display the fetched notes with formatted date
        const result = data.map(note => {
            // Log the create_at value for debugging
            console.log(note.created_at); // Check the format

            // Parse the date and format it
            const createdAt = new Date(note.created_at); // Parse the date string

            // Check if it's a valid date
            const formattedDate = isNaN(createdAt.getTime())
                ? "Invalid Date"  // Handle invalid dates
                : createdAt.toLocaleString(); // Format valid date to readable format

            return `<div class="note">
          <p><strong>ID:</strong> ${note.id}</p>
          <p><strong>Created At:</strong> ${formattedDate}</p>
          <p>${note.content}</p>
        </div>`;
        }).join('');
        document.getElementById('notes').innerHTML = result;
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