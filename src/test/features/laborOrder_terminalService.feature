Feature: Terminal Service Order and ops terminal service order timehseet functionalities
  @auth1
  Scenario: TR user creates a new Terminal service order and then discards the order
    Given the user creates a new Terminal Services Order
    Then the user discards the Terminal Services Order

  @auth1
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Terminal service order
    Given the user creates a new Terminal Services Order
    Then the user firm the Terminal Services Order
    Then the user push the Terminal Services Order to the summary sheet
    Then the user cancel the Terminal Services Order

  @sanity
  Scenario: The TR user creates a new Terminal Services Order and discards it
    Given TR user logged into the application
    Given the user creates a new Terminal Services Order
    Then the user discards the Terminal Services Order


  @sanity
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Terminal Services Order
    Given TR user logged into the application
    Given the user creates a new Terminal Services Order
    Then the user firm the Terminal Services Order
    Then the user push the Terminal Services Order to the summary sheet
    Then the user cancel the Terminal Services Order


  @sanity
  Scenario: Terminal Services Order Timehseet - Save without submit, Save and Submit, Reject, Approve, Remove Approval, Add new steady and Download Report
    Given TR user logged into the application
    Given the user creates a new Terminal Services Order
    Then the user push the Terminal Services Order to the summary sheet
    Given the user creates a timesheet for the Terminal Services Order
    Then delete three rows in the timesheet and add a new row in the timesheet
    Then the user saves the Terminal Services Timehseet without submitting it
    Then the user saves and submits the Terminal Services Timehseet
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the Terminal Services Timehseet
    Then ops user reject the Terminal Services Timehseet
    Then verify remove approval functionality of Terminal Services Timehseet
    Then user click on logout button
    Then Timehseet entry user logged into the application
    Then Labor entry add new steady details and mgr comments and submit the Terminal Services Timehseet
    Then the user saves and submits the Terminal Services Timehseet
    Then the user verifies the download report functionality for the Terminal Services Timehseet
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the Terminal Services Timehseet
    Then user click on logout button