Feature: Admin module

  @sanity
  Scenario: Update LO Reference supporting data
    Given TR user logged into the application
    Then select Supporting Data from the admin menu
    When Select LO_Reference from the type list
    And Click on the edit button
    And Click on the update button
    Then Verify the success message is displayed

  @sanity
  Scenario: Manage Shift and Holiday settings
    Given TR user logged into the application
    Then select Shift and Holiday from the admin menu
    When Click on the save button
    Then Verify the shift holiday success message is displayed

  @sanity
  Scenario: Search/Reset/Download functioanlities in OCC Code
    Given TR user logged into the application
    Then select OCC Code from the admin menu
    When Select Operational Type as "OPS"
    And Select Labor Type as "Hall"
    And Enter Job Type as "AUTO DRIVER"
    And Enter OCC Code as "1"
    When Click on the search button
    And Verify Job Type is "AUTO DRIVER"
    Then click on that row
    Then click on save button and confirm the success message
    Then Click on back button
    When Select Operational Type as "OPS"
    And Select Labor Type as "Hall"
    And Enter Job Type as "AUTO DRIVER"
    And Enter OCC Code as "1"
    When Click on the reset button
    Then Verify Operational Type is reset to default
    And Verify Labor Type is reset to default
    And Verify Job Type field is empty
    And Verify OCC Code field is empty
    When Click on download report button
    Then Verify OCC report is downloaded successfully
    And Verify OCC report contains data with row count

  @sanity
  Scenario: Search/Reset/Download functioanlities in steady positions
    Given TR user logged into the application
    Then select  Steady Positions & Functions from the admin menu
    When Select Operational Type as "Vessel"
    And Select position as "25% Clerk"
    And select function as "Vessel"
    When Click on the search button
    And Verify position is "25% Clerk"
    Then click on that position
    Then click on save button and confirm the success message
    Then Click on back button
    When Select Operational Type as "Vessel"
    And Select position as "25% Clerk"
    And select function as "Vessel"
    When Click on the reset button
    Then Verify Operational Type is reset to default
    And Verify position is reset to default
    And Verify function is reset to default
    When Click on download report button
    Then Verify steady report is downloaded successfully
    And Verify steady report contains data with row count


  @sanity1
  Scenario: Search/Reset/Download functioanlities in steady job role
    Given TR user logged into the application    
    Then select steady Job Role from the admin menu
    When Select Operational Type as "Vessel"
    And Select position as "25% Clerk"
    And Enter Job Worked as "SUPERCARGO"
    When Click on the search button
    And Verify Job Worked is "SUPERCARGO"
    Then click on that Job Worked 
    Then click on save button and confirm the success message
    Then Click on back button
    When Select Operational Type as "Vessel"
    And Select position as "25% Clerk"
    And Enter Job Worked as "SUPERCARGO"
    When Click on the reset button
    Then Verify Operational Type is reset to default
    And Verify position is reset to default
    And Verify Job Worked is reset to default
    When Click on download report button
    Then Verify steady job role is downloaded successfully
    And Verify steady job role contains data with row count