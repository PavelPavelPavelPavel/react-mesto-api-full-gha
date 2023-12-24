import PageWithEntrance from "./PageWithEntrance";

function Register({ onUserSubmit }) {
	return (
		<PageWithEntrance
			onSubmit={onUserSubmit}
			title={"Регистрация"}
			buttonText={"Зарегистрироваться"}
			linkTo={"/sign-in"}
			name={"signup"}
			capchaBtntext={"Уже зарегистрированы? Войти"}
			email={"regEmail"}
			password={"regPassword"}
		/>
	);
}
export default Register;
