// Project data
const projects = [
    {
        displayName: '🚩 Pixel Banner',
        shortName: 'pixel-banner',
        obsidianPluginName: 'Pixel Banner'
    },
    {
        displayName: '🦶 Rich Foot',
        shortName: 'rich-foot',
        obsidianPluginName: 'Rich Foot'
    },
    {
        displayName: '🍱 Semantic Chunking',
        shortName: 'semantic-chunking',
        npmPackageName: 'semantic-chunking',
        demo: 'https://chunking.dyndns.org'
    },
    {
        displayName: '🕵️ Chunk Match',
        shortName: 'chunk-match',
        npmPackageName: 'chunk-match',
        demo: 'https://chunk-match.dyndns.org'
    },
    {
        displayName: '🌐 Web-Augmented Generation',
        shortName: 'web-augmented-generation'
    }
];

// DOM Elements
const form = document.getElementById('releaseForm');
const projectSelect = document.getElementById('project');
const versionInput = document.getElementById('versionNumber');
const releaseNotesInput = document.getElementById('releaseNotes');
const imgURLInput = document.getElementById('imgURL');
const output = document.getElementById('output');
const outputContent = document.getElementById('outputContent');
const copyButton = document.getElementById('copyButton');
const discordButton = document.getElementById('discordButton');
const githubButton = document.getElementById('githubButton');
const kofiButton = document.getElementById('kofiButton');
const resetButton = document.getElementById('resetButton');

// Populate project select
projects.forEach(project => {
    const option = document.createElement('option');
    option.value = JSON.stringify(project);
    option.textContent = project.displayName;
    projectSelect.appendChild(option);
});

// Generate Discord release notes template
function generateDiscordReleaseNotes(project, version, notes, imgUrl) {
    let template = `# ${project.displayName} [v${version}](<https://github.com/jparkerweb/${project.shortName}/releases/tag/${version}>)\n\n`;
    template += `## What's New 🎉\n${notes}\n\n`;
    template += `⇢ [github](<https://github.com/jparkerweb/${project.shortName}>)\n`;
    
    if (project.npmPackageName) {
        template += `⇢ [npm](<https://www.npmjs.com/package/${project.npmPackageName}>)\n`;
    }
    
    if (project.obsidianPluginName) {
        template += `⇢ [plugin](<https://obsidian.md/plugins?search=${encodeURIComponent(project.obsidianPluginName)}>)\n`;
    }
    
    if (imgUrl.trim()) {
        template += `\n![pic](${imgUrl})`;
    }
    
    return template;
}

// Generate GitHub release notes template
function generateGitHubReleaseNotes(version, notes, imgUrl) {
    let template = `## What's New 🎉\n${notes}\n\n`;
    
    if (imgUrl.trim()) {
        template += `![v${version}](${imgUrl})\n\n`;
    }
    
    template += `---\n\n`;
    template += `Please consider sending me a tip to support my work 😀\n`;
    template += `# [🍵 tip me here](https://ko-fi.com/jparkerweb)`;
    
    return template;
}

// Generate Ko-Fi release notes template
function generateKoFiReleaseNotes(project, notes) {
    let template = `${project.displayName} Release\n${notes}\n\n`;
    template += `⇢ https://github.com/jparkerweb/${project.shortName}\n`;
    
    if (project.npmPackageName) {
        template += `⇢ https://www.npmjs.com/package/${project.npmPackageName}\n`;
    }
    
    if (project.demo) {
        template += `⇢ ${project.demo}\n`;
    }
    
    return template;
}

// Generate release notes based on template type
function generateReleaseNotes(templateType) {
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const selectedProject = JSON.parse(projectSelect.value);
    const version = versionInput.value;
    const notes = releaseNotesInput.value;
    const imgUrl = imgURLInput.value;
    
    let releaseNotes;
    switch (templateType) {
        case 'discord':
            releaseNotes = generateDiscordReleaseNotes(selectedProject, version, notes, imgUrl);
            break;
        case 'github':
            releaseNotes = generateGitHubReleaseNotes(version, notes, imgUrl);
            break;
        case 'kofi':
            releaseNotes = generateKoFiReleaseNotes(selectedProject, notes);
            break;
    }
    
    outputContent.textContent = releaseNotes;
    output.classList.remove('hidden');
    
    // Scroll to output section
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event listeners
discordButton.addEventListener('click', () => generateReleaseNotes('discord'));
githubButton.addEventListener('click', () => generateReleaseNotes('github'));
kofiButton.addEventListener('click', () => generateReleaseNotes('kofi'));

// Copy button functionality
copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputContent.textContent);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    window.location.reload();
});
