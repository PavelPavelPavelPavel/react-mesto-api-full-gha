import PageWithEntrance from "./PageWithEntrance";

function Login({ onLogin }) {
	return (
		<PageWithEntrance
			onSubmit={onLogin}
			title={"Вход"}
			buttonText={"Войти"}
			linkTo={""}
			name={"signin"}
			capchaBtntext={""}
			email={"logEmail"}
			password={"logPassword"}
		/>
	);
}
export default Login;
