Feature: Vessel Order by TR Management User - Create, Discard, Firm, Push to Summary Sheet, and Cancel Vessel Orders

  @auth
  Scenario: TR user creates a new vessel order and then discards the order
    Given the user creates a new vessel order
    Then the user discards the vessel order


  @auth
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a vessel order
    Given the user creates a new vessel order
    Then the user firm the order
    Then the user push the labor order to the summary sheet
    Then the user cancel the order

