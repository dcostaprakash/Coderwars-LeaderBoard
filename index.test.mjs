// This is a placeholder file which shows how you use the nock library to
// "mock" fetch requests, replacing real requests with fake ones that you
// control in the test. This means you can "force" the fetch request to return
// data in the format that you want.
// IMPORTANT: You _must_ run npm install within the Project-Codewars-Leaderboard
// folder for this to work.
// You can change or delete the contents of the file once you have understood
// how it works.

import test from "node:test";
import assert from "node:assert/strict";
import nock from "nock";
import { makeFetchRequest, sortValidUsers } from "./functions.js";

test("mocks a fetch function", async () => {
  const scope = nock("https://www.codewars.com")
    .get("/api/v1/users/someone")
    .reply(200, { username: "someone" });

  const response = await makeFetchRequest("someone");
  const parsedResponse = await response.json();

  assert.equal(parsedResponse.username, "someone");
  assert.equal(scope.isDone(), true, "No matching fetch request has been made");
});

test("sorts users by overall ranking", () => {
  const users = [
    { username: "user1", ranks: { overall: { score: 100 } } },
    { username: "user2", ranks: { overall: { score: 200 } } },
    { username: "user3", ranks: { overall: { score: 50 } } },
  ];

  const sortedUsers = sortValidUsers(users, "overall");

  assert.equal(sortedUsers[0].username, "user2");
  assert.equal(sortedUsers[1].username, "user1");
  assert.equal(sortedUsers[2].username, "user3");
});

test("sorts users by language ranking", () => {
  const users = [
    { username: "user1", ranks: { languages: { javascript: { score: 100 } } } },
    { username: "user2", ranks: { languages: { javascript: { score: 200 } } } },
    { username: "user3", ranks: { languages: { javascript: { score: 50 } } } },
  ];

  const sortedUsers = sortValidUsers(users, "javascript");

  assert.equal(sortedUsers[0].username, "user2");
  assert.equal(sortedUsers[1].username, "user1");
  assert.equal(sortedUsers[2].username, "user3");
});
