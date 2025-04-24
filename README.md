# Jet-Posts ✈️📝

Welcome to Jet-Posts! This is a full-stack MERN application designed for quickly sharing your thoughts and images. We focused on keeping things simple, fast, and clean, making it easy to get your ideas out there.

## 🚀 Cool Features

*   **✍️ Write Away:** Create posts using rich text formatting.
*   **🖼️ Picture Perfect:** Easily upload and add images to your posts.
*   **🔒 Safe & Sound:** Secure user registration and login.
*   **📰 The Feed:** Check out all the latest public posts in one place.
*   **✏️ Oops! Control:** Edit or delete your own posts whenever you need.
*   **❤️💬 Coming Up:** Likes & Comments are next on the list!

## 🛠️ How It's Built (Tech Stack)

Jet-Posts is built using the MERN stack:

**Frontend:**
*   React.js
*   Tailwind CSS (for that clean look!)
*   Axios (for talking to the backend)

**Backend:**
*   Node.js
*   Express.js
*   MongoDB + Mongoose (for storing everything)
*   Multer (handles those image uploads)
*   JWT (keeps authentication secure)

## 📁 Project Structure (Planned)

Here's a look at how the project is organized:
jet-posts/
├── client/ # React frontend lives here
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── ...
├── server/ # Node.js backend lives here
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── ...
├── .env # API keys and secrets go here (don't commit!)
└── README.md

## ⚙️ Get It Running

Ready to try it out locally or contribute?

**Prerequisites:**
*   Node.js & npm (or yarn) installed
*   MongoDB installed and running

**Steps:**

1.  **Clone the Project:**
    ```bash
    git clone git@github.com:Mayank7371/Jet-Posts.git
    cd Jet-Posts
    ```

2.  **Set up the Backend:**
    ```bash
    cd server
    npm install
    # Create a .env file in the 'server' directory
    # Add your MongoDB connection string (e.g., MONGO_URI=mongodb://localhost:27017/jet-posts)
    # Add a JWT secret (e.g., JWT_SECRET=yoursecretkey)
    npm start
    ```
    *(The backend server should now be running, typically on port 5000 or specified in your config)*

3.  **Set up the Frontend:**
    ```bash
    # Navigate back to the root directory first if you are in server/
    # cd ..
    # Then navigate to the client directory
    cd client
    npm install
    npm start
    ```
    *(The React development server should start, typically on port 3000)*

Open your browser to `http://localhost:3000` (or the port specified by React) to see the app!

## 📌 What's Next? (Roadmap / TODO)

Here are some features and improvements planned for the future:

*   [ ] Implement Likes & Comments functionality
*   [ ] Build out User Profile pages
*   [ ] Add image compression before upload to save space and improve loading times
*   [ ] Enhance mobile responsiveness across different devices
*   [ ] Introduce a Dark Mode toggle

---

<p align="center">Made with ❤️ by Mayank7371</p>
