Feature: New Order Form Functionalities

  @sanity @newOrderForm
  Scenario: Create a new order with local 13, 63 and 94 details
    Given TR user logged into the application
    Given the user creates a new vessel order
    Then the user firm the order
    Then the user push the labor order to the summary sheet
    When the user navigates to the new order form
    And the user enters work date and shift
    When the user fills details in vessel tab under local 13  
    Then the user fills details in extra tab under local 13
    Then Verify allocation info tab
    And the user fills details in local 63 tab
    Then the user fills details in dock work tab
    And the user fills details in local 94 tab
    Then the user fills details in dock work under local 94
    Then Verify New order report is downloaded
    Then verify 210 report is downloaded
    Then Verify 240 report is downloaded

