# SkyBet App

This project was completed for the Sky Betting & Gaming test.

## Technology Choice

The technology I have chosen to create this app is React.
The server we use in this app is the webpack dev server

## Getting Started

### Installing and Running the App

```bash
# Installing node dependencies with yarn (or npm)
yarn install

# Starting the dev server
yarn dev:start
```

The Dev Server will now be available on `http://localhost:8000/`

## The Test

We realise everyone has different levels of skill and experience when it comes to development so we have listed different levels of tasks below for you to choose from. If you do not have the time or the knowledge to complete them all then that's ok, we just want to see how you approach the problem and get a feel for how you code.

The API uses a snapshot of data from a (relatively) recent point in time. As such, the start times for the events are accurate as of the snapshot so can be used for displaying as an absolute value. They should not be used to calculate the amount of time elapsed in a game as they will likely be hugely inaccurate.

### Task One

Using the provided API:

1.  Build an application which displays the currently live Football events. Events are available from the `/football/live` API endpoint. (completed)
2.  Add an option to show the primary market for each of the events (completed)
3.  Add a feature to toggle the odds display between fractional and decimal (this should apply globally to any place in the app where odds are shown) (completed)

### Task Two

1.  Add a feature to allow users to browse for full details for one of the events (this may be a new page or some other mechanic) (completed)
    1.  Use as much of the detail in the Event response as possible to inform the user of meta data such as event type, start time and scores (completed)
2.  To save on bandwidth, the event API response will only include outcomes for the first ten markets in an event. Add a feature to lazy load the outcomes for any market that doesn't have outcomes loaded as part of the initial response (not completed / unsure what to do)
3.  Enable users to browse to other events directly when viewing an event's details (i.e. not having to navigate via the overview) (completed)

### Task Three

1.  Connect to the WebSocket server and listen to relevant updates for markets and outcomes. (unsure how to complete / never worked with WebSocket)
    1.  Use the included images to help understand what `status.suspended` implies for the User.
2.  Instead of showing all events in one list for the overview, group them by their `linkedEventTypeName` property. A missing value should cause the grouping to fall back to the `typeName` property. (not completed)
    1.  Additionally, anywhere you are displaying full details of an event, where possible use the `linkedEventTypeName` to highlight the competition the event belongs to. (not completed)
3.  Add support for displaying markets with different types (i.e. `win-draw-win` and `correct-score`) with more appropriate layouts. (See the [live website](https://m.skybet.com) for inspiration.) (not completed)
4.  Support "deep linking" of events (i.e. enable a user to browse directly to full details for an event instead of requiring them to navigate from the overview list) (think I completed?)
