import {Alert, Button, Form} from "react-bootstrap";
import {useState} from "react";
import {validaciones} from "./validaciones.js";
import {NavLink, useNavigate} from "react-router-dom";
import Formulario from "../../components/Formulario.jsx";
import {useAuth} from "../../components/context/AuthContext.jsx";
import "./Login.css";

const camposInicioSesion = [
	{
		name: "email",
		label: "Correo electrónico",
		type: "email",
		placeholder: "correo@ejemplo.cl",
		required: true,
		autoComplete: "email",
	},
	{
		name: "password",
		label: "Clave de usuario",
		type: "password",
		placeholder: "Ingresa tu contraseña",
		required: true,
		minLength: 8,
		autoComplete: "current-password",
	},
];

function Login() {
	const navigate = useNavigate();
	const {login} = useAuth();
	const [errores, setErrores] = useState({});
	const [errorApi, setErrorApi] = useState("");
	const [cargando, setCargando] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setErrorApi("");

		const datosFormulario = new FormData(event.currentTarget);
		const valores = Object.fromEntries(datosFormulario);

		const nuevosErrores = validaciones(valores);
		setErrores(nuevosErrores);

		if (Object.keys(nuevosErrores).length > 0) {
			return;
		}

		setCargando(true);
		try {
			const data = await login({
				email: valores.email,
				password: valores.password,
			});
			const rolNormalizado = (data.rol || "")
				.replace("ROLE_", "")
				.toUpperCase();
			navigate(
				rolNormalizado === "ADMIN" ? "/admin/productos" : "/productos",
			);
		} catch (err) {
			setErrorApi(
				err.response?.data?.message ||
					"Credenciales incorrectas. Verifica tu correo y contraseña.",
			);
		} finally {
			setCargando(false);
		}
	}

	return (
		<section className="container py-5">
			<article className="card inicio-sesion-tarjeta p-4">
				{errorApi && (
					<Alert variant="danger" className="mb-3">
						{errorApi}
					</Alert>
				)}

				<Form noValidate onSubmit={handleSubmit}>
					<Formulario
						titulo={"Iniciar Sesión"}
						campos={camposInicioSesion}
						errores={errores}
					/>

					<div className="d-flex justify-content-around mb-3 ">
						<Form.Check
							type="checkbox"
							label={"Recordar usuario"}
						/>

						<NavLink
							to={"/recuperacion"}
							className="text-decoration-none">
							¿Olvidaste tu contraseña?
						</NavLink>
					</div>

					<Button
						className={"w-50 mt-3"}
						variant={"primary"}
						type={"submit"}
						color={"primary"}
						disabled={cargando}>
						{cargando ? "Iniciando..." : "Iniciar Sesión"}
					</Button>
				</Form>
			</article>
			<Button
				className={"w-25 mt-3"}
				variant={"primary"}
				onClick={() => navigate("/register")}>
				Registrarse
			</Button>
		</section>
	);
}

export default Login;
