import Formulario from "../../components/Formulario.jsx";
import {Alert, Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./Register.css";
import {useState} from "react";
import {validacionesRegistro} from "./validaciones.js";
import {useAuth} from "../../components/context/AuthContext.jsx";

const campos = [
	{
		name: "nombre",
		label: "Nombre",
		type: "text",
		placeholder: "Ingrese su primer nombre",
		required: true,
		autoComplete: "given-name",
	},
	{
		name: "apellido",
		label: "Apellido",
		type: "text",
		placeholder: "Ingrese su primer apellido",
		required: true,
		autoComplete: "family-name",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "nombre@correo.cl",
		required: true,
		autoComplete: "email",
	},
	{
		name: "telefono",
		label: "Teléfono",
		type: "tel",
		placeholder: "+56 9 1234 5678",
		required: true,
		autoComplete: "tel",
	},
	{
		name: "password",
		label: "Contraseña",
		type: "password",
		placeholder: "Mínimo 8 caracteres",
		required: true,
		minLength: 8,
		autoComplete: "new-password",
	},
	{
		name: "region",
		label: "Región",
		type: "text",
		placeholder: "Ingrese su región",
		required: true,
	},
	{
		name: "comuna",
		label: "Comuna",
		type: "text",
		placeholder: "Ingrese su comuna",
		required: true,
	},
	{
		name: "direccion",
		label: "Dirección",
		type: "text",
		placeholder: "Calle y número",
		required: true,
		autoComplete: "street-address",
	},
];

function Register() {
	const navigate = useNavigate();
	const {register} = useAuth();
	const [errores, setErrores] = useState({});
	const [errorApi, setErrorApi] = useState("");
	const [cargando, setCargando] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setErrorApi("");

		const datosFormulario = new FormData(event.currentTarget);
		const valores = Object.fromEntries(datosFormulario);

		const nuevosErrores = validacionesRegistro(valores);
		setErrores(nuevosErrores);

		if (Object.keys(nuevosErrores).length > 0) {
			return;
		}

		setCargando(true);
		try {
			const data = await register(valores);
			navigate(data?.token ? "/productos" : "/login");
		} catch (err) {
			setErrorApi(
				err.response?.data?.message ||
					"No se pudo completar el registro. Verifica los datos.",
			);
		} finally {
			setCargando(false);
		}
	}

	return (
		<section className="container py-5">
			<article className="card registro-tarjeta p-4 mx-auto">
				{errorApi && (
					<Alert variant="danger" className="mb-3">
						{errorApi}
					</Alert>
				)}

				<Form noValidate={true} onSubmit={handleSubmit}>
					<Formulario
						titulo={"Crear cuenta"}
						campos={campos}
						errores={errores}
					/>

					<div className={"d-flex justify-content-end gap-2 mt-4"}>
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => navigate("/login")}>
							Volver
						</Button>
						<Button
							variant={"primary"}
							type={"submit"}
							disabled={cargando}>
							{cargando ? "Registrando..." : "Terminar"}
						</Button>
					</div>
				</Form>
			</article>
		</section>
	);
}

export default Register;
