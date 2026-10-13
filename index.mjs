const userForm = document.querySelector("#user-form");
const usernameInput = document.querySelector("#usernames");
const message = document.querySelector("#message");
const userList = document.querySelector("#user-list");

export function getUsernames(input) {
  // Split the text wherever there is a comma.
  const usernames = input.split(",");

  // Remove spaces and ignore empty entries.
  return usernames
    .map((username) => username.trim())
    .filter((username) => username !== "");
}

/* Handle the form when the user clicks "Add users".
 */
userForm.addEventListener("submit", function (event) {
  // Stop the browser from refreshing the page.
  event.preventDefault();

  // Clear any previous message.
  message.textContent = "";
  message.className = "";

  // Remove the usernames displayed by the previous submission.
  userList.replaceChildren();

  // Read the input and convert it into a list.
  const usernames = getUsernames(usernameInput.value);

  // Show an error if no usernames were entered.
  if (usernames.length === 0) {
    message.textContent = "Please enter at least one username.";
    message.className = "error";
    usernameInput.focus();
    return;
  }

  // Display each username in the list.
  usernames.forEach(function (username) {
    // Create a new list item.
    const listItem = document.createElement("li");

    // Add the username as text.
    listItem.textContent = username;

    // Add the list item to the page.
    userList.appendChild(listItem);
  });

  // Tell the user that the names have been added.
  message.textContent =
    "Added " + usernames.length + " username(s) to the list.";
});

export function makeFetchRequest() {
  return fetch("https://example.com/test");
}
