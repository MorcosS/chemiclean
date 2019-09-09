import {
  LOGIN_SUBMIT_REQUEST_STARTED,
  LOGIN_SUBMIT_REQUEST_FAILURE,
  LOGIN_SUBMIT_REQUEST_SUCCESS,
  AUTH_PROP_CHANGED,
  SUBDOMAIN_LOOKUP_REQUEST_FAILURE,
  SUBDOMAIN_LOOKUP_REQUEST_SUCCESS
} from "../../actionTypes";
import authReducer, { initialStates } from "./authReducer";
import { Constants } from "../../constants";

describe(" auth reducer functionality testing ", () => {
  // ...
  describe(" initial states for auth reducer ", () => {
    test("is correct", () => {
      const action = { type: "dummy_action" };
      const initialState = initialStates;
      expect(authReducer(undefined, action)).toEqual(initialState);
    });
  });

  describe(" signInUser action effect on reducer ", () => {
    test(" with signin action start ", () => {
      const action = { type: LOGIN_SUBMIT_REQUEST_STARTED };
      expect(authReducer(undefined, action)).toEqual({
        ...initialStates,
        loading: true,
        error: false,
        errorMessage: null,
      });
    });

    test(" with signin success action  ", () => {
      const action = { type: LOGIN_SUBMIT_REQUEST_SUCCESS, homePermissions: [
        { item_name: "dashboard" },
        { item_name: "groups", main_component: Constants.MANAGE_USERS },
        { item_name: "pledge_management" },
        { item_name: "reports" },
        { item_name: "settings" }
      ]};
      expect(authReducer(undefined, action)).toEqual({
        ...initialStates,
        loading: false,
        error: false,
        errorMessage: null,
        homePermissions: [
          { item_name: "dashboard" },
          { item_name: "groups", main_component: Constants.MANAGE_USERS },
          { item_name: "pledge_management" },
          { item_name: "reports" },
          { item_name: "settings" }
        ]
      });
    });

    test(" with signin error action  ", () => {
      const errorMessage = "Invalid login";
      const action = { type: LOGIN_SUBMIT_REQUEST_FAILURE, errorMessage };
      expect(authReducer(undefined, action)).toEqual({
        ...initialStates,
        loading: false,
        error: true,
        errorMessage: errorMessage,
      });
    });

    test(" with signin with a full scenario   ", () => {
      const prop1 = "userName";
      const value1 = "admin";
      const action1 = { type: AUTH_PROP_CHANGED, prop1, value1 };
      const prop2 = "password";
      const value2 = "password";
      const action2 = { type: AUTH_PROP_CHANGED, prop2, value2 };
      var stateTesting = initialStates;
      stateTesting[prop1] = value1;
      stateTesting[prop2] = value2;
      const authReducerChangedUserNamePassword = authReducer(
        authReducer(undefined, action1),
        action2
      );
      const authValues = { userName: value1, password: value2 };
      const loadingAction = { type: LOGIN_SUBMIT_REQUEST_STARTED, authValues };

      const authReducerWithLoadingAction = authReducer(
        authReducerChangedUserNamePassword,
        loadingAction
      );
      const successAction = { type: LOGIN_SUBMIT_REQUEST_SUCCESS, homePermissions:[
        { item_name: "dashboard" },
        { item_name: "groups", main_component: Constants.MANAGE_USERS },
        { item_name: "pledge_management" },
        { item_name: "reports" },
        { item_name: "settings" }
      ] };
      const authReducerWithSuccess = authReducer(
        authReducerWithLoadingAction,
        successAction
      );
      expect(authReducer(authReducerWithSuccess, successAction)).toEqual({
        ...initialStates,
        loading: false,
        error: false,
        errorMessage: null,
        userName: value1,
        password: value2,
        homePermissions:[
          { item_name: "dashboard" },
          { item_name: "groups", main_component: Constants.MANAGE_USERS },
          { item_name: "pledge_management" },
          { item_name: "reports" },
          { item_name: "settings" }
        ],
      });
      const errorMessage = "Invalid login";
      const failureAction = { type: LOGIN_SUBMIT_REQUEST_FAILURE, errorMessage };
      expect(authReducer(authReducerWithSuccess, failureAction)).toEqual({
        ...initialStates,
        loading: false,
        error: true,
        errorMessage: errorMessage,
        userName: value1,
        password: value2,
      });
    });
  });

  describe(" changeAuthProp action on auth reducer ", () => {
    test(" username prop changing scenario  ", () => {
      const prop = "userName";
      const value = "admin";
      const action = { type: AUTH_PROP_CHANGED, prop, value };
      var stateTesting = initialStates;
      stateTesting[prop] = value;
      expect(authReducer(undefined, action)).toEqual(stateTesting);
    });

    test(" password prop changing scenario  ", () => {
      const prop = "password";
      const value = "password";
      const action = { type: AUTH_PROP_CHANGED, prop, value };
      var stateTesting = initialStates;
      stateTesting[prop] = value;
      expect(authReducer(undefined, action)).toEqual(stateTesting);
    });

    test(" username and password prop changing scenario  ", () => {
      const prop1 = "userName";
      const value1 = "admin";
      const action1 = { type: AUTH_PROP_CHANGED, prop1, value1 };
      const prop2 = "password";
      const value2 = "password";
      const action2 = { type: AUTH_PROP_CHANGED, prop2, value2 };
      var stateTesting = initialStates;
      stateTesting[prop1] = value1;
      stateTesting[prop2] = value2;
      expect(authReducer(authReducer(undefined, action1), action2)).toEqual(
        stateTesting
      );
    });

    test(" subdomain action error scenario  ", () => {
      const errorMessage = "error"
      const action1 = { type: SUBDOMAIN_LOOKUP_REQUEST_FAILURE, errorMessage: errorMessage};
      var stateTesting = initialStates;
      stateTesting["subdomainError"] = true;
      stateTesting["errorMessage"] = errorMessage;
      expect(authReducer(undefined, action1)).toEqual(
        stateTesting
      );
    });


    test(" subdomain action success scenario  ", () => {
      const action1 = { type: SUBDOMAIN_LOOKUP_REQUEST_SUCCESS};
      var stateTesting = initialStates;
      stateTesting["subdomainError"] = false;
      expect(authReducer(undefined, action1)).toEqual(
        stateTesting
      );
    });


  });
});
