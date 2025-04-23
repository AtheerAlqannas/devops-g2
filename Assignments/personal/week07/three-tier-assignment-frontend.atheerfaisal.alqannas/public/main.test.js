describe("Main.js Tests", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Clear the table body
    $("#userTableBody").empty();

    // Mock config.json response
    global.fetch.mockResolvedValueOnce({
      text: () =>
        Promise.resolve(JSON.stringify({ API_URL: "http://test-api/" })),
    });
  });

  describe("getUsers", () => {
    it("should fetch and display users successfully", async () => {
      const mockUsers = [
        {
          id: 1,
          name: "John",
          email: "john@example.com",
          age: 30,
          address: "123 St",
        },
        {
          id: 2,
          name: "Jane",
          email: "jane@example.com",
          age: 25,
          address: "456 Ave",
        },
      ];

      $.get.mockImplementationOnce((url, callback) => {
        callback(mockUsers);
      });

      // Load the main.js file
      await require("./main.js");

      // Wait for the next tick to allow async operations to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect($.get).toHaveBeenCalledWith(
        "http://test-api/api/user",
        expect.any(Function)
      );
      expect($("#userTableBody").html()).toContain("John");
      expect($("#userTableBody").html()).toContain("Jane");
    });
  });

  describe("saveUser", () => {
    it("should create new user successfully", async () => {
      // Setup form values
      $("#name").val("New User");
      $("#email").val("new@example.com");
      $("#age").val("25");
      $("#address").val("789 Blvd");

      $.ajax.mockImplementationOnce((options) => {
        options.success();
      });

      await require("./main.js");

      // Call saveUser directly
      window.saveUser();

      expect($.ajax).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "http://test-api/api/user",
          type: "POST",
          data: JSON.stringify({
            id: 0,
            name: "New User",
            email: "new@example.com",
            age: "25",
            address: "789 Blvd",
          }),
        })
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      // Mock confirm dialog
      window.confirm = jest.fn(() => true);

      $.ajax.mockImplementationOnce((options) => {
        options.success();
      });

      await require("./main.js");

      // Call deleteUser directly
      window.deleteUser(1);

      expect($.ajax).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "http://test-api/api/user/1",
          type: "DELETE",
        })
      );
    });
  });

  describe("showMessage", () => {
    it("should display success message", async () => {
      await require("./main.js");

      // Call showMessage directly
      window.showMessage("Test success message", "success");

      expect($("#messages").html()).toContain("Test success message");
      expect($("#messages").html()).toContain("alert-success");
    });

    it("should display error message", async () => {
      await require("./main.js");

      // Call showMessage directly
      window.showMessage("Test error message", "error");

      expect($("#messages").html()).toContain("Test error message");
      expect($("#messages").html()).toContain("alert-error");
    });
  });
});
