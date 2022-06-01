import { JSDOM } from "jsdom";
import { streakCounter } from "../src/index";

export function formattedDate(date: Date): string {
  return date.toLocaleDateString("en-US");
}

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

 beforeEach(() => {
   const mockJSDom = new JSDOM("", { url: "https://localhost" });

   mockLocalStorage = mockJSDom.window.localStorage;
 });
 it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
   // TODO: implement
     const date = new Date();
     const streak = streakCounter(mockLocalStorage, date);
   
     expect(streak.hasOwnProperty("currentCount")).toBe(true);
     expect(streak.hasOwnProperty("startDate")).toBe(true);
     expect(streak.hasOwnProperty("lastLoginDate")).toBe(true);
 });
 it("should return a streak starting at 1 and keep track of lastLoginDate", () => {
   // TODO: implement
   const date = new Date();
   const streak = streakCounter(mockLocalStorage, date);
 
   const dateFormatted = formattedDate(date);
 
   expect(streak.currentCount).toBe(1);
   expect(streak.lastLoginDate).toBe(dateFormatted);
 });
 afterEach(() => {
  mockLocalStorage.clear();
});     

  it("should store the streak in localStorage", () => {
    const date = new Date();
    const key = "streak";
    streakCounter(mockLocalStorage, date);

    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });

  // Separate suite to test different scenario
  describe("with a pre-populated streak", () => {
    let mockLocalStorage: Storage;
    beforeEach(() => {
      const mockJSDom = new JSDOM("", { url: "https://localhost" });

      mockLocalStorage = mockJSDom.window.localStorage;

      // Use date in past so it’s always the same
      const date = new Date("12/12/2021");

      const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
      };

      mockLocalStorage.setItem("streak", JSON.stringify(streak));
    });
    afterEach(() => {
      mockLocalStorage.clear();
    });
    it("should return the streak from localStorage", () => {
      const date = new Date();
      const streak = streakCounter(mockLocalStorage, date);

      // Should match the dates used to set up the tests
      expect(streak.startDate).toBe("12/12/2021");
    });
  });

  // Separate suite to test different scenario
  describe("with a pre-populated streak", () => {
    // TODO: populate localStorage with a streak
    it("should increment the streak", () => {
      // TODO: implement
      const date = new Date("12/13/2021");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);
    });
    it("should not increment the streak when login days not consecutive", () => {
      // TODO: implement
      const date = new Date("12/14/21");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(1);
    });
    it("should save the incremented streak to localStorage", () => {
      // TODO: implement
      const key = "streak";
      const date = new Date("12/13/2021");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      const streakAsString = mockLocalStorage.getItem(key);
      // Normally you should wrap in try/catch in case the JSON is bad but since we authored it, we can skip here
      const streak = JSON.parse(streakAsString || "");

      expect(streak.currentCount).toBe(2);
    });
  });

  // Separate suite to test different scenario
  describe("with a pre-populated streak", () => {
    // TODO: populate localStorage with a streak
    it("should reset if not consecutive", () => {
      // TODO: implement
      const date = new Date("12/13/2021");
      const streak = streakCounter(mockLocalStorage, date);
      expect(streak.currentCount).toBe(2);

      // skip a day and update the streak
      const dateUpdated = new Date("12/15/2021");
      const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);
      expect(streak.currentCount).toBe(1);
    });
    it("should not reset the streak for same-day login", () => {
      // TODO: implement
      const date = new Date("12/13/2021");
      const streak = streakCounter(mockLocalStorage, date);

      // simulate same day login
      const dateUpdated = new Date("12/13/2021");
      const streakUpdated = streakCounter(mockLocalStorage, date);
      expect(streak.currentCount).toBe(2);
    });
    it("should save the reset streak to localStorage", () => {
      // TODO: implement
      const key = "streak";
      const date = new Date("12/13/2021");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      // Skip a day and break the streak
      const dateUpdated = new Date("12/15/2021");
      const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);

      const streakAsString = mockLocalStorage.getItem(key);
      // Normally you should wrap in try/catch in case the JSON is bad
      // but since we authored it, we can skip here
      const streak = JSON.parse(streakAsString || "");

      expect(streak.currentCount).toBe(1);
    });
  });

});
