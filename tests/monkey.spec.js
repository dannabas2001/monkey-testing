const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");

test.describe("Los estudiantes under monkeys", () => {
  test("visits los estudiantes and survives monkeys", async ({ page }) => {
    await page.goto("https://losestudiantes.com");
    await page.waitForTimeout(5000); 

    await runMonkey(page, 10); 
  });
});

async function closeModalIfPresent(page) {
  try {
    const modals = await page.$$("div.modal-dialog");
    for (const modal of modals) {
      if (await modal.isVisible()) {
        // intenta cerrar con botón
        const closeButton = await modal.$("button:has-text('×')");
        if (closeButton && await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(300);
        } else {
          await page.mouse.click(10, 10);
          await page.waitForTimeout(300);
        }
        console.log("Modal cerrado");
      }
    }
  } catch (error) {
    console.log("Error verificando modales:", error.message);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function runMonkey(page, eventCount) {
  for (let i = 0; i < eventCount; i++) {
    if (page.isClosed()) break;

    await closeModalIfPresent(page);

    const eventType = getRandomInt(0, 4);

    try {
      switch (eventType) {
        case 0: { 
          const links = await page.$$("a");
          if (links.length > 0) {
            const link = links[getRandomInt(0, links.length)];
            if (await link.isVisible()) await link.click({ force: true });
          }
          break;
        }
        case 1: { 
          const inputs = await page.$$("input");
          if (inputs.length > 0) {
            const input = inputs[getRandomInt(0, inputs.length)];
            if (await input.isVisible()) await input.fill(faker.lorem.word());
          }
          break;
        }
        case 2: { 
          const selects = await page.$$("select");
          if (selects.length > 0) {
            const select = selects[getRandomInt(0, selects.length)];
            if (await select.isVisible()) {
              const options = await select.$$("option");
              if (options.length > 0)
                await select.selectOption({ index: getRandomInt(0, options.length) });
            }
          }
          break;
        }
        case 3: { 
          const buttons = await page.$$("button");
          if (buttons.length > 0) {
            const randomButton = buttons[getRandomInt(0, buttons.length)];
            if (await randomButton.isVisible()) await randomButton.click({ force: true });
          }
          break;
        }
      }
    } catch (error) {
      console.log("Error ejecutando evento:", error.message);
      
    }
    await page.waitForTimeout(1000);
  }
}
