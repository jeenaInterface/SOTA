# Automated the following test scenarios as a proof of concept (POC).​
# Test cases are written in the feature file using Gherkin syntax. 

Feature:  TR User Functionalities - Yard Order, Summary Sheet, Timesheet
@auth
Scenario: TR User workflow from Yard Order to Timesheet
    Given User creates a new labor order
    Given User verifies that the labor order is pushed to the summary sheet and verifies the details
    Given User creates a timesheet for the same yard order

