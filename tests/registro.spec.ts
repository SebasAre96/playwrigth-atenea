import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json';

let registerPage: RegisterPage;
TestData.usuarioValido
test.beforeEach(async ({page}) => {
    registerPage = new RegisterPage(page);
    await registerPage.visitarPaginaRegistro();
})

test('TC-1 Verificación de elementos visuales en la página de registro', async ({ page }) => {
 await expect(registerPage.firstNameInput).toBeVisible();
 await expect(registerPage.lastNameInput).toBeVisible();
 await expect(registerPage.emailInput).toBeVisible();
 await expect(registerPage.passwordInput).toBeVisible();
 await expect(registerPage.registerButton).toBeVisible();
});

test('TC-2 Verificar Boton de regiustro esta inhabilitado por defecto', async ({ page }) => {
await expect(registerPage.registerButton).toBeDisabled();
});

test('TC-3 Verificar que el boton de registro se habilita al completar los campos obligatorios', async ({ page }) => {
await registerPage.completarFormularioRegistro(TestData.usuarioValido);
await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesion al hacer click', async ({ page }) => {
await registerPage.loginButton.click();
await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-5 Verificar Registro existoso con datos validos', async ({ page }) => {
test.step('Completar el formulario con datos validos', async () => {
    const email = (TestData.usuarioValido.email.split('@')[0]) +Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1];
    TestData.usuarioValido.email = email;
    await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido);
});
await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electronico ya existente', async ({ page }) => {
const email = (TestData.usuarioValido.email.split('@')[0]) +Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1];
TestData.usuarioValido.email = email;
await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido)
await expect(page.getByText('Registro exitoso')).toBeVisible();
await registerPage.visitarPaginaRegistro();
await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido)
await expect(page.getByText('Email already in use')).toBeVisible();
await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
