const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// SCSS env 복사
const envExportPath = path.resolve(__dirname, '../src/scss/_env.export.scss');
const envTargetPath = path.resolve(__dirname, '../src/scss/_env.scss');

fs.copyFileSync(envExportPath, envTargetPath);

// JS env 복사
const envExportTsx = path.resolve(__dirname, '../src/env/_env.export.tsx');
const envTargetTsx = path.resolve(__dirname, '../src/env/_env.tsx');
fs.copyFileSync(envExportTsx, envTargetTsx);

const EXPORT_DIR = path.resolve(__dirname, '../out');
const STATIC_DIR = path.resolve(__dirname, '../../_web(git)/src/main/resources/static/front');
const TEMPLATE_DIR = path.resolve(__dirname, '../../_web(git)/src/main/resources/templates');

// 0. 기존 static/front, templates 정리
fs.emptyDirSync(STATIC_DIR);
fs.emptyDirSync(TEMPLATE_DIR);

// 1. out/ 루트의 HTML → templates/
fs.ensureDirSync(TEMPLATE_DIR);
fs.readdirSync(EXPORT_DIR).forEach((file) => {
  const fullPath = path.join(EXPORT_DIR, file);
  if (file.endsWith('.html')) {
    fs.copyFileSync(fullPath, path.join(TEMPLATE_DIR, file));
  }
});

// 2. component, layout, Magazine 내부의 HTML도 templates/로 복사
['component', 'layout', 'Magazine'].forEach((folder) => {
  const folderPath = path.join(EXPORT_DIR, folder);
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const fullPath = path.join(folderPath, file);
      if (file.endsWith('.html')) {
        fs.copyFileSync(fullPath, path.join(TEMPLATE_DIR, file));
      }
    });
  }
});

// 3. 정적 리소스만 static/front/로 복사
const foldersToCopy = ['_next', 'images', 'fonts'];
fs.ensureDirSync(STATIC_DIR);
foldersToCopy.forEach((folder) => {
  const from = path.join(EXPORT_DIR, folder);
  const to = path.join(STATIC_DIR, folder);
  if (fs.existsSync(from)) {
    fs.copySync(from, to);
  }
});

// 4. static/front에 잘못 들어간 .html 제거 (안전)
fs.readdirSync(STATIC_DIR).forEach((file) => {
  if (file.endsWith('.html')) {
    fs.removeSync(path.join(STATIC_DIR, file));
  }
});

// 5. templates 안의 HTML들 보기 좋게 포맷 (prettier)
const prettierGlob = path.join(TEMPLATE_DIR, '**/*.html');

try {
  const htmlFiles = fs.readdirSync(TEMPLATE_DIR).filter(file => file.endsWith('.html'));
  const hasHtml = htmlFiles.length > 0;

  if (hasHtml) {
    execSync(`npx prettier --write "${prettierGlob}"`, { stdio: 'inherit' });
    console.log('✅ HTML 포맷 완료!');
  } else {
    console.log('ℹ️ templates 폴더에 .html 파일이 없어 prettier 생략');
  }
} catch (err) {
  console.warn('⚠ prettier 실행 중 오류 (무시):', err.message);
}


console.log('✅ 전체 export 정리 완료: templates + static/front');
