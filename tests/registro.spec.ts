import { test, expect } from '@playwright/test';

test('TC-1 Verificación de elementos visuales en la página de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('TC-2 Verificar Boton de regiustro esta inhabilitado por defecto', async ({ page }) => {
await page.goto('http://localhost:3000/');
await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 Verificar que el boton de registro se habilita al completar los campos obligatorios', async ({ page }) => {
await page.goto('http://localhost:3000/');
await page.fill('input[name="firstName"]', 'John');
await page.fill('input[name="lastName"]', 'Doe');
await page.fill('input[name="email"]', 'johndoe@example.com');
await page.fill('input[name="password"]', 'password123');
await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesion al hacer click', async ({ page }) => {
await page.goto('http://localhost:3000/');
await page.getByTestId('boton-login-header-signup').click();
await expect(page).toHaveURL('http://localhost:3000/login')
await page.waitForTimeout(5000);
});

test('TC-5 Verificar Registro existoso con datos validos', async ({ page }) => {
await page.goto('http://localhost:3000/');
await page.fill('input[name="firstName"]', 'Juan');
await page.fill('input[name="lastName"]', 'Torres');
await page.fill('input[name="email"]', 'juantorres'+Date.now().toString()+'@email.com');
await page.fill('input[name="password"]', '123456');
await page.getByTestId('boton-registrarse').click();
await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electronico ya existente', async ({ page }) => {
const email = 'juantorres'+Date.now().toString()+'@email.com';
await page.goto('http://localhost:3000/');
await page.fill('input[name="firstName"]', 'Juan');
await page.fill('input[name="lastName"]', 'Torres');
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', '123456');
await page.getByTestId('boton-registrarse').click();
await expect(page.getByText('Registro exitoso')).toBeVisible();
await page.goto('http://localhost:3000/');
await page.fill('input[name="firstName"]', 'Juan');
await page.fill('input[name="lastName"]', 'Torres');
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', '123456');
await page.getByTestId('boton-registrarse').click();
await expect(page.getByText('Email already in use')).toBeVisible();
await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
