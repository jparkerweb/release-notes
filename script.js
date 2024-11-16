// Project data
const projects = [
    {
        displayName: '🚩 Pixel Banner',
        shortName: 'pixel-banner',
        obsidianPluginName: 'Pixel Banner',
        hashtags: '#Obsidian #ObsidianMD #Plugins #Banners',
    },
    {
        displayName: '🦶 Rich Foot',
        shortName: 'rich-foot',
        obsidianPluginName: 'Rich Foot',
        hashtags: '#Obsidian #ObsidianMD #Plugins #Footnotes'
    },
    {
        displayName: '🍱 Semantic Chunking',
        shortName: 'semantic-chunking',
        npmPackageName: 'semantic-chunking',
        demo: 'https://chunking.dyndns.org',
        hashtags: '#LLM #RAG #AI #AITools #Chunking',
        npmPackageName: 'semantic-chunking'
    },
    {
        displayName: '🕵️ Chunk Match',
        shortName: 'chunk-match',
        npmPackageName: 'chunk-match',
        demo: 'https://chunk-match.dyndns.org',
        hashtags: '#LLM #RAG #AI #AITools #Chunking',
        npmPackageName: 'chunk-match'
    },
    {
        displayName: '🌐 Web-Augmented Generation',
        shortName: 'web-augmented-generation',
        hashtags: '#LLM #AITools #NodeJS #SearXNG #WebScraping'
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
const xButton = document.getElementById('xButton');
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
    template += `#### Grab the latest update directly from the Obsidian app! If you have any suggestions or encounter any issues, don't hesitate to reach out. 😁\n\n`;
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
    const formattedNotes = formatNotesWithEmojis(notes);
    let template = `${project.displayName} Release\n\n${formattedNotes}\n\n🐙 https://github.com/jparkerweb/${project.shortName}`;
    
    if (project.obsidianPluginName) {
        template += `\n💎 https://obsidian.md/plugins?search=${project.obsidianPluginName}`;
    }
    
    if (project.npmPackageName) {
        template += `\n🥡 https://www.npmjs.com/package/${project.npmPackageName}`;
    }

    return template;
}

// Generate X post release notes template
function generateXReleaseNotes(project, notes) {
    const formattedNotes = formatNotesWithEmojis(notes);
    let template = `${project.displayName} Release\n\n${formattedNotes}\n\n🐙 https://github.com/jparkerweb/${project.shortName}`;
    
    if (project.obsidianPluginName) {
        template += `\n💎 https://obsidian.md/plugins?search=${project.obsidianPluginName}`;
    }
    
    if (project.npmPackageName) {
        template += `\n🥡 https://www.npmjs.com/package/${project.npmPackageName}`;
    }
    
    template += `\n\n${project.hashtags}`;
    return template;
}

// Helper function to format notes with section emojis
function formatNotesWithEmojis(notes) {
    const lines = notes.split('\n');
    let currentSection = '';
    let currentEmoji = '';
    const formattedLines = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('### ')) {
            const [title, emoji] = trimmedLine.substring(4).split(' ');
            currentSection = title.toLowerCase();
            currentEmoji = emoji;
        } else if (trimmedLine.startsWith('- ')) {
            const bulletText = trimmedLine.substring(2);
            formattedLines.push(`⇢ ${currentEmoji} ${currentSection} ${bulletText}`);
        }
    }

    return formattedLines.join('\n');
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

    let content = '';
    switch (templateType) {
        case 'discord':
            content = generateDiscordReleaseNotes(selectedProject, version, notes, imgUrl);
            break;
        case 'github':
            content = generateGitHubReleaseNotes(version, notes, imgUrl);
            break;
        case 'kofi':
            content = generateKoFiReleaseNotes(selectedProject, notes);
            break;
        case 'x':
            content = generateXReleaseNotes(selectedProject, notes);
            break;
    }
    
    outputContent.textContent = content;
    output.classList.remove('hidden');
    
    // Scroll to output section
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event listeners
discordButton.addEventListener('click', () => generateReleaseNotes('discord'));
githubButton.addEventListener('click', () => generateReleaseNotes('github'));
kofiButton.addEventListener('click', () => generateReleaseNotes('kofi'));
xButton.addEventListener('click', () => generateReleaseNotes('x'));

// Copy button functionality
function copyToClipboard(text) {
    // Create a temporary textarea element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make it invisible but ensure it's in the DOM
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    
    document.body.appendChild(textArea);
    
    try {
        // Select the text
        textArea.focus();
        textArea.select();
        
        // Try to copy
        const successful = document.execCommand('copy');
        
        // Clean up
        document.body.removeChild(textArea);
        
        return successful;
    } catch (err) {
        // Clean up
        document.body.removeChild(textArea);
        console.error('execCommand Error:', err);
        return false;
    }
}

copyButton.addEventListener('click', () => {
    const success = copyToClipboard(outputContent.textContent);
    if (success) {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
    } else {
        console.error('Failed to copy');
        alert('Failed to copy to clipboard');
    }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    window.location.reload();
});
