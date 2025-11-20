[![Netlify Status](https://api.netlify.com/api/v1/badges/7e738aaa-a06a-4faf-b4cb-7b3fa1ac93e3/deploy-status)](https://app.netlify.com/projects/supabase-notes/deploys)
![Version](https://img.shields.io/badge/version-2.0-blue)

# Supabase Notes
Supabase Notes is a web application made with React and Supabase that allows users to manage their notes.

### [Live Demo](https://supabase-notes.netlify.app/)

## Features
- **Real-time Database**: Instant synchronization of notes across devices.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Tools Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
- **Backend**:
  - Supabase

## Getting Started

Follow these steps to set up the project locally:

### 1. **Clone the Repository** and install dependencies:

   ```bash
   git clone https://github.com/ISE-S46/Supabase_Notes.git
   cd Supabase_Notes

   npm install
   ```
### 2. **Set Up Supabase**:
- Sign up for a Supabase account.
- Create a new organization.
- Create a new project.
- create new table name "Note" with
  - id, int, primary key
  - title, text
  - content, text
  - created_at, timestampz, Default value: now()
- in SQL editor or at Authentication/Policies set policies:

  ```sql
  create policy "Public Select"
  on "Note"
  as PERMISSIVE
  for select
  to anon
  using (true);

  create policy "Public Insert"
  on "Note"
  as PERMISSIVE
  for insert
  to anon
  with check (true);

  create policy "Public Update"
  on "Note"
  for update
  as PERMISSIVE
  to anon
  using (true)
  with check (true);

  create policy "Public Delete"
  on "Note"
  as PERMISSIVE
  for delete
  to anon
  using (true);
  ```

### 3. **Create .env file** at root:
- Copy the Project URL and API keys.
- Add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL = your-supabase-url
    VITE_SUPABASE_KEY = your-supabase-anonymous-key
    ```
### 4. **Launch the Application**:
```bash
npm run dev        # for development
npm run build      # for production build
npm run preview    # preview production build
```

![Notes](/public/SupabaseNotes.png)