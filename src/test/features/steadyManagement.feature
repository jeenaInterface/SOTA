Feature: Steady Management

  Background:
    Given User navigates to the application
    When TR management User enter the username and password
    When User click on the login button

@Steadymanagement
Scenario: Update a steady details
    Given Go to steady management screen
    And Select vessel as operational type
    When Click on search button
    Then Update the details for the First Steady in the table and confirm the success message.

@Steadymanagement1
Scenario: Check that the appropriate message is displayed when searching for an incorrect steady.
    Given Go to steady management screen
    Then Enter a wrong steady name in the search box
    When Click on search button
    Then Confirm validation message is displayed