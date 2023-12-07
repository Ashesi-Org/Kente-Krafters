const express = require('express');
const router = express.Router();

import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.18.1/cesdk.umd.js';

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.18.1/assets',
  theme: 'dark',
  callbacks: { onUpload: 'local' }
};

document.addEventListener('DOMContentLoaded', () => {
  CreativeEditorSDK.create('#cesdk_container', config).then(async (editor) => {
    editor.addDefaultAssetSources();
    editor.addDemoAssetSources({ sceneMode: 'Design' });
    await editor.createDesignScene();
    const engine = editor.engine;

    // Dispose the Editor when done to cleanup all memories and dangling references
    // editor.dispose();
  });
});


module.exports = router;