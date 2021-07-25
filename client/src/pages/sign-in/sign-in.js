import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import formStyles from "../../styles/form.module.scss";

import { setCurrentUser as setCurrentUserRedux } from "../../redux/current-user/current-user.actions";

import { signInOrRegister } from "../../api/api.user";
import { setCurrentUser } from "../../local-storage/current-user";

import InputGroup from "../../components/input-group/input-group";
import FormHeader from "../../components/form-header/form-header";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";

const SignIn = ({ currentUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [signingIn, setSigningIn] = useState(false);

	console.log(currentUser);

	const dispatch = useDispatch();

	const handleFormSubmit = async (error) => {
		error.preventDefault();

		setSigningIn(true);

		clearFieldErrors();

		try {
			const validationResult = await signInOrRegister("signin", {
				email,
				password,
			});

			setSigningIn(false);

			if (validationResult.error) {
				return setFieldErrors(validationResult.error);
			}

			setCurrentUser(validationResult.user);
			dispatch(setCurrentUserRedux(true));
		} catch (error) {
			setSigningIn(false);
		}
	};

	const clearFieldErrors = () => {
		setEmailError("");
		setPasswordError("");
	};

	const setFieldErrors = (error) => {
		if (error.includes("incorrect")) {
			setEmailError(error);
			return setPasswordError(error);
		}

		if (error.includes("email")) {
			return setEmailError(error);
		}

		return setPasswordError(error);
	};

	return (
		<div className={formStyles.container}>
			<FormHeader
				heading="sign in to quesh"
				subheading="do not have an account?"
				link="register"
				linkTo="register"
			/>
			<form className={formStyles.form} onSubmit={handleFormSubmit}>
				<InputGroup
					label="email"
					value={email}
					error={emailError}
					changeHandler={setEmail}
				/>
				<InputGroup
					label="password"
					type="password"
					placeholder="minimum 7 characters"
					value={password}
					error={passwordError}
					changeHandler={setPassword}
				/>
				<Button size="full">
					{signingIn ? (
						<React.Fragment>
							signing in <Spinner color="white" />{" "}
						</React.Fragment>
					) : (
						"sign in"
					)}
				</Button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(SignIn);
