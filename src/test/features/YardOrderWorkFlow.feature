Feature: Yard order work flow for TR user


@auth
Scenario: Create a yard order by TR user
    Given Go to yard order screen
    And Select work date, shift and job number and click on Go button
    When Select start time
    Then Enter values in manning table
    Then Select the steady and flex type
    Then the user clicks on the Save-May-can button
    Then verify whether the yard order is created successfully
    Then the user clicks on the push button

@auth
Scenario: Verify that the yard order details are reflected in the summary sheet by TR user
    Given the user navigates to the summary sheet
    Then the user select the data and shift
    Then Verify yard order details pushed to the summary sheet
    Then verify the manner count and steady details are reflected in summary sheet

@auth
Scenario: Create timehseet by TR user
    Given the user navigates to the yard order timehseet
    Then Select work date, shift and job number
    Then Enter ST and OT hrs and click on the save without submit button.
    Then verify the timehseet is created successfully


