import { signInUser, subdomainCheck } from "./authActions";
import {
  LOGIN_SUBMIT_REQUEST_SUCCESS,
  LOGIN_SUBMIT_REQUEST_STARTED,
  LOGIN_SUBMIT_REQUEST_FAILURE,
  SUBDOMAIN_LOOKUP_REQUEST_START,
  SUBDOMAIN_LOOKUP_REQUEST_FAILURE,
  SUBDOMAIN_LOOKUP_REQUEST_SUCCESS
} from "../../actionTypes";
import store from "../../components/Testing/mockStore";
import { Constants } from "../../constants";
import { signIn, login, subdomainLookup } from "../../api/api";
import Response from "../../api/Response";
jest.mock("../../api/api");
describe("test auth actions functions", () => {
  beforeEach(() => {
    fetch.resetMocks();
    subdomainLookup.mockImplementation(
      subdomain => {
        return new Promise(resolve => {
          setTimeout(function() {
            if (subdomain.domain_name === "x") {
              resolve({
                code: 200,
                error: false,
                data:{
                  domain_exists:true
                }
              });
            } else {
              resolve({
                error: true,
                errorMessage: "This domain is not found!"
              });
            }
          }, 2000);
        });
      })
  });

  it(" should test wrong credentials scenario ", () => {
    store.clearActions();
    var x = {
      username: "m.",
      password: "lmlm"
    };
    const expectedActions = [
      { type: LOGIN_SUBMIT_REQUEST_STARTED },
      { type: LOGIN_SUBMIT_REQUEST_FAILURE, errorMessage: "" }
    ];
   
    signIn.mockImplementation(
      () =>
        new Promise(async resolve => {
          var r = new Response();
          await r.initialize({
            status: 400,
            json: function() {
              return {
                errors: [
                  {
                    source: "non_field_errors",
                    detail: ["Invalid Credentials."],
                    error_code: "401-01"
                  }
                ]
              };
            }
          },signIn,signIn,resolve,[
              { item_name: "dashboard" },
            ])
          }));
    return store.dispatch(signInUser(x)).then(() => {
      // return of async actions
      var actualActions = store.getActions();
      expect(actualActions[0]).toEqual(expectedActions[0]);
      expect(actualActions[1].type).toEqual(expectedActions[1].type);
      expect(actualActions[1]).toHaveProperty("errorMessage");
    });
  });

  it(" should test right credentials scenario ", () => {
    store.clearActions();
    signIn.mockImplementation(
      () =>
        new Promise(async resolve => {
          var r = new Response();
          await r.initialize({
            status: 200,
            json: function() {
              return {
                      data: {
                              access:
                                 Constants.TEST_TOKEN,
                                refresh:
                                Constants.TEST_TOKEN
                              }
                            };
            }
          },signIn,x,resolve,[
            { item_name: "dashboard" },
           
          ]);
        })
    );
   
    var x = {
      username: "admin",
      password: "12345678aA"
    };
    const expectedActions = [
      { type: LOGIN_SUBMIT_REQUEST_STARTED },
      {
        type: LOGIN_SUBMIT_REQUEST_SUCCESS,
        homePermissions: [
          { item_name: "dashboard" },
          
        ]
      }
    ];
    return store.dispatch(signInUser(x)).then(response => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem(Constants.ACCESS_TOKEN)).toEqual(
        Constants.TEST_TOKEN
      );
    });
  });
  it(" should test wrong subdomain action scenario ", () => {
    store.clearActions();
    
    const expectedActions = [
      { type: SUBDOMAIN_LOOKUP_REQUEST_START },
      { type: SUBDOMAIN_LOOKUP_REQUEST_FAILURE, errorMessage: "" }
    ];
    return store.dispatch(subdomainCheck()).then(() => {
      // return of async actions
      var actualActions = store.getActions();
      expect(actualActions[0]).toEqual(expectedActions[0]);
      expect(actualActions[1].type).toEqual(expectedActions[1].type);
      expect(actualActions[1]).toHaveProperty("errorMessage");
    });
  });
  it(" should test wrong subdomain action scenario ", () => {
    store.clearActions();
    const expectedActions = [
      { type: SUBDOMAIN_LOOKUP_REQUEST_START },
      { type: SUBDOMAIN_LOOKUP_REQUEST_FAILURE, errorMessage: "" }
    ];
    return store.dispatch(subdomainCheck("x")).then(() => {
      // return of async actions
      var actualActions = store.getActions();
      expect(actualActions[0]).toEqual(expectedActions[0]);
      expect(actualActions[1].type).toEqual(expectedActions[1].type);
      expect(actualActions[1]).toHaveProperty("errorMessage");
    });
  });

  it(" should test correct subdomain action scenario ", () => {
    store.clearActions();
    const expectedActions = [
      { type: SUBDOMAIN_LOOKUP_REQUEST_START },
      { type: SUBDOMAIN_LOOKUP_REQUEST_SUCCESS }
    ];
    return store.dispatch(subdomainCheck("x")).then(() => {
      // return of async actions
      var actualActions = store.getActions();
      expect(actualActions[0]).toEqual(expectedActions[0]);
      expect(actualActions[1].type).toEqual(expectedActions[1].type);
    });
  });
});
