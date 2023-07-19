import React from 'react';
import "../components/About.css"
const About = () => {
  return (
    <div className="about-container">
      <h2>About MERN To-Do App</h2>
      <p>
        This is a To-Do app developed using the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js.
        It allows users to create, read, update, and delete tasks in a simple and intuitive manner.
      </p>
      <p>
        The MERN stack is a popular choice for building full-stack JavaScript applications. Here's a brief overview of each component:
      </p>
      <ul>
        <li>
          <strong>MongoDB:</strong> A NoSQL database that stores the tasks and provides data persistence.
        </li>
        <li>
          <strong>Express.js:</strong> A minimal and flexible Node.js web application framework that handles server-side logic and APIs.
        </li>
        <li>
          <strong>React.js:</strong> A JavaScript library for building user interfaces. It handles the client-side rendering and provides a rich interactive experience for users.
        </li>
        <li>
          <strong>Node.js:</strong> A JavaScript runtime that allows running JavaScript on the server-side. It handles server-side logic and communication with the database.
        </li>
      </ul>
      <p>
        By combining these technologies, we can create a robust and scalable web application for managing tasks efficiently.
      </p>
      <p>
        Thank you for using our MERN To-Do app! If you have any questions or feedback, please don't hesitate to contact us.
      </p>
    </div>
  );
};

export default About;


