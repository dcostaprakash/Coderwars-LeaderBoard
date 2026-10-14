import { makeFetchRequest } from "./functions.js";

const state = {
  usernames: [],
  validUsers: [],
  selectedLanguage: "overall",
  languages: [],
};

const userForm = document.querySelector("#user-form");
const usernameInput = document.querySelector("#usernames");
const message = document.getElementById("message");
const userList = document.querySelector("#user-list");
const addUsersButton = document.getElementById("add-users");
const rankingSection = document.querySelector("#ranking-section");
const rankingSelect = document.querySelector("#ranking-select");
const leaderboardBody = document.querySelector("#leaderboard-body");

addUsersButton.addEventListener("click", handleFormSubmit);
rankingSelect.addEventListener("change", handleRankingChange);

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
async function handleFormSubmit(event) {
  // Stop the browser from refreshing the page.
  event.preventDefault();

  // Clear any previous message.
  message.textContent = "";
  message.className = "";

  // Remove the usernames displayed by the previous submission.
  userList.replaceChildren();
    leaderboardBody.replaceChildren();
  rankingSection.hidden = true;

  // Read the input and convert it into a list.
  state.usernames = getUsernames(usernameInput.value);
    state.validUsers = [];
  state.languages = [];

  // Show an error if no usernames were entered.
  if (state.usernames.length === 0) {
    message.textContent = "Please enter at least one username.";
    message.className = "error";
    usernameInput.focus();
    return;
  }
 try {
await getValidUsers();

   // Display each username in the list.
    state.validUsers.forEach(function (user) {
      // Create a new list item.
      const listItem = document.createElement("li");

      // Add the username as text.
      listItem.textContent = user.username;

      // Add the list item to the page.
      userList.appendChild(listItem);

      // Find the languages available for the leaderboard.
      Object.keys(user.ranks.languages || {}).forEach(function (language) {
        if (!state.languages.includes(language)) {
          state.languages.push(language);
        }
      });
    });

    // Add the ranking options to the dropdown.
    rankingSelect.replaceChildren();
    rankingSelect.add(new Option("Overall ranking", "overall"));

    state.languages.forEach(function (language) {
      rankingSelect.add(new Option(language, language));
    });

    // Show the overall ranking by default.
    state.selectedLanguage = "overall";
    rankingSelect.value = "overall";

    if (state.validUsers.length > 0) {
      rankingSection.hidden = false;
      displayLeaderboard();
    }

    // Tell the user if any usernames were not found.
    const invalidUsernames = state.usernames.filter(function (username) {
      return !state.validUsers.some(function (user) {
        return user.username.toLowerCase() === username.toLowerCase();
      });
    });

    if (invalidUsernames.length > 0) {
      message.textContent =
        "Users not found: " + invalidUsernames.join(", ");
    } else if (state.validUsers.length === 0) {
      message.textContent = "No valid users were found. Please check the usernames.";
    } else {
      message.textContent = "Users loaded successfully.";
    }
  } catch (error) {
    message.textContent =
      "Could not fetch Codewars data. Check your internet connection and try again.";
    message.className = "error";
  }
}

async function getValidUsers() {
  const invalidUsernames = [];

  for (const username of state.usernames) {
    const response = await makeFetchRequest(username);

    if (response.ok) {
      const userData = await response.json();
      state.validUsers.push(userData);
    } else if (response.status === 404) {
      invalidUsernames.push(username);
    } else {
      throw new Error("Codewars API request failed.");
    }
  }

  return invalidUsernames;
}

// Update the table when a different ranking is selected.
function handleRankingChange() {
  state.selectedLanguage = rankingSelect.value;
  displayLeaderboard();
}

// Get the score for the selected ranking.
export function getRankingScore(user, language) {
  if (language === "overall") {
    return user.ranks.overall.score;
  }

  return user.ranks.languages[language]?.score;
}

// Display the leaderboard in descending score order.
function displayLeaderboard() {
  leaderboardBody.replaceChildren();

  const users = state.validUsers
    .filter(function (user) {
      return getRankingScore(user, state.selectedLanguage) !== undefined;
    })
    .sort(function (a, b) {
      return (
        getRankingScore(b, state.selectedLanguage) -
        getRankingScore(a, state.selectedLanguage)
      );
    });

  users.forEach(function (user, index) {
    const row = document.createElement("tr");

    // Highlight the user with the highest score.
    if (index === 0) {
      row.className = "top-user";
    }

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;

    const clanCell = document.createElement("td");
    clanCell.textContent = user.clan || "";

    const scoreCell = document.createElement("td");
    scoreCell.textContent = getRankingScore(user, state.selectedLanguage);

    row.append(usernameCell, clanCell, scoreCell);
    leaderboardBody.appendChild(row);
  });

  if (users.length === 0) {
    message.textContent = "No users have a ranking for this selection.";
  }
}