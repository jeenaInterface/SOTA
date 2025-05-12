Feature: New Order Form Functionalities

  @neworder
  Scenario: Create a new order with local 13, 63 and 94 details
    Given TR user logged into the application
    When the user navigates to the new order form
    And the user enters work date and shift
    And the user clicks on Go button
    When the user fills details in local 13 tab
    And the user fills details in local 63 tab
    And the user fills details in local 94 tab
