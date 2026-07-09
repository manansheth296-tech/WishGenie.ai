# WishGenie.ai 🔮

A dark fantasy, single-page wish-granting web game. Rub the ancient lamp, summon a cosmic entity, and offer your desires. But beware: this is no ordinary genie. Powered by **Google Gemini AI**, the Genie will search dimensional timelines to grant your wish... while crafting ironical, catastrophic loopholes that lead to your tragic ruin.

---

## 🌟 Key Features

*   **Tactile Lamp Rubbing**: A fully interactive rubbing system. Move your mouse or drag your finger over the lamp to charge the progress meter, trigger magic sparks, and summon the entity.
*   **The Book of Tragedies**: A full-screen, leather-bound historical Tome that logs all your wishes, loophole outcomes, and ironical concessions. Your path of ruin is saved securely using **`localStorage`**, persisting even through page refreshes.
*   **Dual Gameplay Modes**:
    *   **Simulation Mode (Default)**: Play instantly offline! Uses a pre-written dictionary of wishes (wealth, love, power, happiness) and dark fantasy twists.
    *   **AI Mode (Gemini Active)**: Enter a free **Gemini API Key** in the settings modal to unleash a fully dynamic, custom AI Genie that analyzes any text input you write.
*   **Procedural Audio Engine**: 100% synthetic sound effects (ambient wind swells, rub hums, book slides, and low-frequency catastrophe rumbles) synthesized dynamically inside your browser using the **Web Audio API**. No asset loading lags or CORS issues.
*   **Rich Dark Fantasy Aesthetics**: Built with high-fidelity custom CSS, featuring glowing runic rings, parchment layers, custom scrollbars, and deep gothic colour palettes.

---

## 🛠️ Technology Stack

*   **Frontend**: HTML5 (Semantic Structure) & CSS3 (Custom variables, dark theme variables, responsive grids).
*   **Logical Core**: Vanilla JavaScript (ES6 classes, async/await REST fetching).
*   **Audio**: Web Audio API (Synthesized oscillators, Lowpass filters, Gain envelopes).
*   **Visual Effects**: HTML5 Canvas (Particle emitter calculations).
*   **AI Integration**: Google Gemini 2.5 Flash REST API.

---

## 🚀 How to Play & Host

### Running Locally
1. Clone or download this repository.
2. Double-click the **`index.html`** file in your folder to open it instantly in any web browser.

### Hosting on GitHub Pages (Free)
1. Push this repository to your GitHub account.
2. Go to your repository's **Settings** tab.
3. Select **Pages** on the left menu.
4. Under **Branch**, select **`main`** and folder **`/ (root)`**, then click **Save**.
5. Your website will be live at: `https://<your-username>.github.io/WishGenie.ai/`

---

## 🔑 Sealing the AI Core (Gemini API)

To play in full **AI Mode** with custom wishes:
1. Click the **Gear Icon** in the top-right corner of the screen.
2. Visit [Google AI Studio](https://aistudio.google.com/) to get a free API Key.
3. Paste the key into the input field and click **"Seal Connection"**.
*   *Note: Your API Key is stored safely in your own browser's local storage and is only sent directly to Google's endpoints.*

---

## 📜 License

This project is open-source and free to adapt. Feel free to copy, modify, and build your own ironical entities!
