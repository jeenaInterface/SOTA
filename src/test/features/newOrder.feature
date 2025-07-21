Feature: New Order Form Functionalities

  @neworder
  Scenario: Create a new order with local 13, 63 and 94 details
    Given TR user logged into the application
    # Given the user creates a new vessel order
    # Then the user firm the order
    # Then the user push the labor order to the summary sheet
    When the user navigates to the new order form
    And the user enters work date and shift
    When the user fills details in local 13 tab
    And the user fills details in local 63 tab
    # And the user fills details in local 94 tab
