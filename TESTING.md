All of the below requirements must be met for the project to be considered complete:

The website must contain an input to accept a comma-separated list of users - I checked manually and it does
Submitting the list of users fetches data from the Codewars API about each of the users - I checked manually and it does
Based on the leaderboard data, a drop-down is shown, allowing the user to pick from all of the possible language rankings plus the overall ranking - I checked manually and it does
The default ranking selected is the overall ranking - Yes it is. Manually checked
A table is shown for the current ranking, with columns for each user's username, clan and score - Yes it is
Changing the selected ranking will update the table to reflect the newly selected ranking - Yes it does
The table is sorted from the highest to lowest score, top to bottom - Yes - checked manually
Users without a ranking in a chosen language are not shown in that table - Yes. Checked manually
The top user's score is visually highlighted - Yes it is
The website must score 100% for accessibility in Lighthouse in the Desktop device mode, for all views in the website - Yes it does
Unit tests must be written for at least one non-trivial function - Have written 3 non trivial unit test functions
The project must not contain any dead code. All written JavaScript and CSS must be used. - Checked there is no dead code
Searching for a user which doesn't exist should show a message to the user explaining this. - Yes it does
If multiple users were searched for, it is acceptable to either just error, or to show the valid users, but the user should be made aware of each of the invalid users. - Yes, it displays invalid users seperately
If fetching from the Codewars API errors (e.g. because you're offline, or made a bad request), the user must be shown a useful error message in the UI. - Yes it does
Error messages should not make misleading claims about what went wrong, and it should be clear what the user should do about it to rectify the situation. - Yes manually checked.
