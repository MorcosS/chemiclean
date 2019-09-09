import React from "react";
import { mount } from "enzyme";
import Login from "./Login";

import { mapStateToProps } from "./LoginContainer";
import renderer from "react-test-renderer";
import Loading from "x";
describe("Login container rendering", () => {
  describe("Login Validation form", () => {
    const signInUser = jest.fn(callback => {
      callback();
    });

    const inValidSubmit = jest.fn(callback => {
      callback();
    });

    const changeAuthProp= jest.fn()
    it("check sign in with invalid username and password", done => {
      var expectedValidSubmitCallbackValues = {
        username: "a",
        password: "ad"
      };
      var expectedInvalidSubmissionValues = ["username", "password"];
      function callback(values, inValidValues) {
        expect(signInUser).toHaveBeenCalledTimes(0);
        expect(inValidSubmit).toHaveBeenCalledTimes(1);
        expect(inValidValues).toEqual(expectedInvalidSubmissionValues);
        done();
      }
      const form = mount(
        <Login changeAuthProp={changeAuthProp}
          signInUser={values => signInUser(() => callback(values, undefined))}
          onInvalidSubmission={values =>
            inValidSubmit(() => callback(undefined, values))
          }
        />
      );
      var username = form.find("#username").at(1);
      var password = form.find("#password").at(1);
      var loginButton = form.find(".loginButton").at(0);
      username.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.username }
      });
      password.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.password }
      });
      loginButton.simulate("submit");
    });

    it("check sign in with invalid username", done => {
      var expectedValidSubmitCallbackValues = {
        username: "a",
        password: "adminpassword123"
      };
      var expectedInvalidSubmissionValues = ["username"];
      function callback(values, inValidValues) {
        expect(signInUser).toHaveBeenCalledTimes(0);
        expect(inValidSubmit).toHaveBeenCalledTimes(1);
        expect(inValidValues).toEqual(expectedInvalidSubmissionValues);
        done();
      }
      const form = mount(
        <Login changeAuthProp={changeAuthProp}
          signInUser={values => signInUser(() => callback(values, undefined))}
          onInvalidSubmission={values =>
            inValidSubmit(() => callback(undefined, values))
          }
        />
      );
      var username = form.find("#username").at(1);
      var password = form.find("#password").at(1);
      var loginButton = form.find(".loginButton").at(0);
      username.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.username }
      });
      password.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.password }
      });
      loginButton.simulate("submit");
    });

    it("check sign in with invalid password", done => {
      var expectedValidSubmitCallbackValues = {
        username: "admin",
        password: "adminpass"
      };
      var expectedInvalidSubmissionValues = ["password"];
      function callback(values, inValidValues) {
        expect(signInUser).toHaveBeenCalledTimes(0);
        expect(inValidSubmit).toHaveBeenCalledTimes(1);
        expect(inValidValues).toEqual(expectedInvalidSubmissionValues);
        done();
      }
      const form = mount(
        <Login changeAuthProp={changeAuthProp}
          signInUser={values => signInUser(() => callback(values, undefined))}
          onInvalidSubmission={values =>
            inValidSubmit(() => callback(undefined, values))
          }
        />
      );
      var username = form.find("#username").at(1);
      var password = form.find("#password").at(1);
      var loginButton = form.find(".loginButton").at(0);
      username.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.username }
      });
      password.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.password }
      });
      loginButton.simulate("submit");
    });

    it("check sign in with valid username and password with also correct credentials", done => {
      var expectedValidSubmitCallbackValues = {
        username: "admin",
        password: "adminpassword123"
      };
      var expectedInvalidSubmissionValues = undefined;
      function callback(values, inValidValues) {
        expect(signInUser).toHaveBeenCalledTimes(1);
        expect(values).toEqual(expectedValidSubmitCallbackValues);
        expect(inValidSubmit).toHaveBeenCalledTimes(0);
        expect(inValidValues).toEqual(expectedInvalidSubmissionValues);
        done();
      }
      const form = mount(
        <Login changeAuthProp={changeAuthProp}
          signInUser={values => signInUser(() => callback(values, undefined))}
          onInvalidSubmission={values =>
            inValidSubmit(() => callback(undefined, values))
          }
        />
      );
      var username = form.find("#username").at(1);
      var password = form.find("#password").at(1);
      var loginButton = form.find(".loginButton").at(0);
      username.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.username }
      });
      password.simulate("change", {
        target: { value: expectedValidSubmitCallbackValues.password }
      });
      loginButton.simulate("submit");
    });

    it(" will render loading component when passing loading prop is true ", () => {  
      const form = mount(
        <Login changeAuthProp={changeAuthProp} loading={true}
          signInUser={values => signInUser(() => {})}
          onInvalidSubmission={values =>
            inValidSubmit(() => {})
          }
        />
      );
      expect(form.contains(Loading)).toBe(true)
    });

    it(" will not render loading component when passing loading prop is false ", () => {  
      const form = mount(
        <Login changeAuthProp={changeAuthProp} loading={false}
          signInUser={values => signInUser(() => {})}
          onInvalidSubmission={values =>
            inValidSubmit(() => {})
          }
        />
      );
      var loadingComponent = form.find("#loadingComponent");
      var tableLoadingComponent = form.find("#tableLoadingComponent");
      expect(form.contains(loadingComponent)).toBe(false)
      expect(form.contains(tableLoadingComponent)).toBe(false)
    });

    it(" will render not error component when passing error prop is false ", () => {  
      const form = mount(
        <Login changeAuthProp={changeAuthProp} error={false}
          signInUser={values => signInUser(() => {})}
          onInvalidSubmission={values =>
            inValidSubmit(() => {})
          }
        />
      );
      var errorMessageComponent = form.find("#error");
      expect(form.contains(errorMessageComponent)).toBe(false);
    });

    it(" will render error component when passing error prop is true ", () => {  
      const errorMessage = "Wrong Credentials";
      const form = mount(
        <Login changeAuthProp={changeAuthProp} error={true} errorMessage={errorMessage}
          signInUser={values => signInUser(() => {})}
          onInvalidSubmission={values =>
            inValidSubmit(() => {})
          }
        />
      );
      expect(form.find("#errorComponent").exists()).toBe(true);
      var errorMessageComponent = form.find("#error");
      expect(errorMessageComponent.props().children).toEqual(errorMessage);
    });

    describe(" The login container element", () => {
      describe("mapStateToProps", () => {
        it("should map the state to props correctly", () => {
          const appState = {
            auth: {
              loading: false,
              errorMessage: ""
            }
          };
          const ownProps = {};
          const componentState = mapStateToProps(appState, ownProps);
          expect(componentState).toEqual(appState.auth);
        });
      });
    });

    describe("The login display", () => {
      it("Should not regress with no extra props", () => {
        const tree = renderer.create(
          <Login signInUser={signInUser} onInvalidSubmission={inValidSubmit} />
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });

      it("Should not regress with loading prop", () => {
        const tree = renderer.create(
          <Login signInUser={signInUser} onInvalidSubmission={inValidSubmit} loading={true}/>
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });

      it("Should not regress with error prop", () => {
        const tree = renderer.create(
          <Login signInUser={signInUser} onInvalidSubmission={inValidSubmit} errorMessage={"Wrong"} error={true}/>
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });

    });
  });
});
