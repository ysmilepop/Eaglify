console.log("Checking if #messages-container exists...");
console.log(document.getElementById("messages-container")); // Check if the element exists

import { getFirestore, collection, getDocs } 
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from "./firebase.js";

async function fetchMessages() {
    try {
        console.log("Fetching messages...");

        const container = document.getElementById("messages-container");
        if (!container) {
            console.error("Element #messages-container not found! Make sure the div exists.");
            return;
        }

        const messagesRef = collection(db, "users"); // Make sure this is the correct collection
        const querySnapshot = await getDocs(messagesRef);

        if (querySnapshot.empty) {
            console.log("No messages found.");
            container.innerHTML = "<p>No messages found.</p>";
            return;
        }

        let messagesHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Fetched message:", data);

            messagesHTML += `
            <div class="message-card">
                <p><strong>Name:</strong> ${data.name || "Unknown"}</p>
                <div class="message-header">
                    <p><strong>Email:</strong> ${data.email || "N/A"}</p>
                    <p class="message-date"><strong>Date:</strong> ${data.date || "Unknown date"}</p>
                </div>
                <p><strong>Message:</strong> ${data.message || "No message provided."}</p>
            </div>
        `;
        });

        container.innerHTML = messagesHTML;
    } catch (error) {
        console.error("Error fetching messages:", error);
        document.getElementById("messages-container").innerHTML = 
            `<p style="color: red;">Error loading messages. Check console.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", fetchMessages); // Runs after the page is loaded
