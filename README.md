# Supabase Notes
Supabase Notes is a web-based application that allows users to create, manage, and store notes.

## Features
- **Real-time Database**: Instant synchronization of notes across devices.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Tools Used

- **Frontend**:
  - HTML
  - CSS
    - Bootstrap Framework
  - JavaScript
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
- create new table with
  - id, int, primary key
  - content, text
  - created_at, timestampz, Default value: now()
- in SQL editor set policy

  ```sql
  create policy "Enable access to DB for all"
  on "public"."Note"
  as PERMISSIVE
  for ALL
  to anon, authenticated
  using (
    true
  ) 
  with check (
    true
  );
  ```
- Copy the Project URL and API keys.

### 3. **Create .env file** at root:
- Add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL = your-supabase-url;
    VITE_SUPABASE_KEY = your-supabase-anonymous-key;
    ```
### 4. **Launch the Application**:
- Run 
```bash
npm run vite
```
- build & preview
```bash
npm run build
npm run preview
```

![Notes](/public/SupabaseNotes.png)
