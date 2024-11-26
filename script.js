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

const discordServerLink = 'https://discord.gg/sp8AQQhMJ7';

// DOM Elements
const form = document.getElementById('releaseForm');
const projectSelect = document.getElementById('project');
const versionInput = document.getElementById('versionNumber');
const tagLineInput = document.getElementById('tagLine');
const releaseNotesInput = document.getElementById('releaseNotes');
const imgURLInput = document.getElementById('imgURL');
const output = document.getElementById('output');
const outputContent = document.getElementById('outputContent');
const outputHeader = document.getElementById('outputHeader');
const obsidianCss = document.getElementById('obsidianCss');
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
    let template = `# ${project.displayName} [v${version}](<https://github.com/jparkerweb/${project.shortName}/releases/tag/${version}>)`;
    template += `\n\n`;
    
    if (project.tagLine) {
        template += `## ${project.tagLine}`;
    } else {
        template += `## What's New 🎉`;
    }

    template += `\n${notes}\n\n`;
    
    template += `### Grab the latest update directly from the Obsidian app!`;
    template += `\n_If you have any suggestions or encounter any issues, don't hesitate to reach out._ 😁\n\n`;
    template += `🐙 [github](<https://github.com/jparkerweb/${project.shortName}>)`;
    
    if (project.npmPackageName) {
        template += ` — 📦 [npm](<https://www.npmjs.com/package/${project.npmPackageName}>)`;
    }
    
    if (project.obsidianPluginName) {
        template += ` — 💎 [plugin](<https://obsidian.md/plugins?search=${encodeURIComponent(project.obsidianPluginName)}>)`;
    }

    template += ` — 💻 [equill labs](https://www.equilllabs.com)`;
    template += ` — 💬 [Discord server](${discordServerLink})`;

    template += `\n`;
    
    if (imgUrl.trim()) {
        template += `\n![🖼️ image](${imgUrl})`;
    }
    
    return template;
}

// Generate GitHub release notes template
function generateGitHubReleaseNotes(version, notes, imgUrl) {
    let template = `## What's New 🎉`;
    template += `\n\n### v${version}`;
    template += `\n${notes}\n\n`;
    
    if (imgUrl.trim()) {
        template += `![v${version}](${imgUrl})\n\n`;
    }
    
    template += `---\n\n`;
    template += `Please consider sending me a tip to support my work 😀\n`;
    template += `# 🍵 [tip me here](https://ko-fi.com/jparkerweb)`;
    template += `\n`;
    template += `⇢ 💻 Visit [eQuill Labs](https://www.quilllabs.com)`;
    template += `\n`;
    template += `⇢ 💬 Join the [Discord](${discordServerLink})`;
    
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

    template += `\n💻 https://www.equilllabs.com`;
    template += `\n💬 ${discordServerLink}`;

    return template;
}

// Generate X post release notes template
function generateXReleaseNotes(project, version, notes, tagLine) {
    const formattedNotes = formatNotesWithEmojis(notes);
    let template = `${project.displayName} Release`;
    template += `\nv${version}`;
    if (tagLine) {
        template += ` - ${tagLine}`;
    }
    
    template += `\n\n${formattedNotes}\n\n🐙 https://github.com/jparkerweb/${project.shortName}`;
    
    if (project.obsidianPluginName) {
        template += `\n💎 https://obsidian.md/plugins?search=${project.obsidianPluginName}`;
    }
    
    if (project.npmPackageName) {
        template += `\n🥡 https://www.npmjs.com/package/${project.npmPackageName}`;
    }

    template += `\n 💻 https://www.equilllabs.com`;
    template += `\n 💬 ${discordServerLink}`;
    
    template += `\n\n${project.hashtags}`;
    return template;
}

// Generate Obsidian release notes template
function generateObsidianReleaseNotes(project, version, notes, tagLine) {
    let template = `---\nbanner: \n---\n # ${project.displayName} ⋅ v${version}${tagLine ? ` - ${tagLine}` : ''} { .release-title }`;
    template += `\n\n#### What's New 🎉\n\n${notes}`;
    
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
            // Extract emoji and section from "### 🫧 Added" format
            const [emoji, ...sectionParts] = trimmedLine.substring(4).split(' ');
            currentEmoji = emoji;
            currentSection = sectionParts.join(' ').toLowerCase();
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

    const project = JSON.parse(projectSelect.value);
    const version = versionInput.value;
    const tagLine = tagLineInput.value;
    const notes = releaseNotesInput.value;
    const imgUrl = imgURLInput.value;

    let generatedNotes = '';
    let generatedHeader = '';

    // Hide CSS snippet by default
    obsidianCss.style.display = 'none';

    switch (templateType) {
        case 'discord':
            generatedNotes = generateDiscordReleaseNotes(project, version, notes, imgUrl);
            generatedHeader = `${project.displayName} ⋅ v${version}${tagLine ? ` - ${tagLine}` : ''}`;
            break;
        case 'github':
            generatedNotes = generateGitHubReleaseNotes(version, notes, imgUrl);
            generatedHeader = `v${version}${tagLine ? ` - ${tagLine}` : ''}`;
            break;
        case 'kofi':
            generatedNotes = generateKoFiReleaseNotes(project, notes);
            generatedHeader = `v${version} - ${tagLine}`;
            break;
        case 'x':
            generatedNotes = generateXReleaseNotes(project, version, notes, tagLine);
            generatedHeader = "";
            break;
        case 'obsidian':
            generatedNotes = generateObsidianReleaseNotes(project, version, notes, tagLine);
            generatedHeader = "";
            obsidianCss.style.display = 'block';
            break;
    }

    output.classList.remove('hidden');
    const title = document.querySelector('#output h2');
    title.textContent = `Generated Release Notes for ${templateType.charAt(0).toUpperCase() + templateType.slice(1)}`;
    outputContent.textContent = generatedNotes;
    outputHeader.textContent = generatedHeader;
    if (outputHeader.textContent === "") {
        outputHeader.classList.add('hidden');
    } else {
        outputHeader.classList.remove('hidden');
    }
    
    // scroll to output section
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event listeners
discordButton.addEventListener('click', () => generateReleaseNotes('discord'));
githubButton.addEventListener('click', () => generateReleaseNotes('github'));
kofiButton.addEventListener('click', () => generateReleaseNotes('kofi'));
xButton.addEventListener('click', () => generateReleaseNotes('x'));
obsidianButton.addEventListener('click', () => generateReleaseNotes('obsidian'));
resetButton.addEventListener('click', () => {
    form.reset();
    output.classList.add('hidden');
});

// Copy functionality for output header
outputHeader.addEventListener('click', async () => {
    if (outputHeader.textContent.trim() === '') return;
    
    const success = await copyToClipboard(outputHeader.textContent);
    if (success) {
        showToast('Header copied to clipboard!');
    }
});

// Copy functionality for output content
outputContent.addEventListener('click', async () => {
    if (outputContent.textContent.trim() === '') return;
    
    const success = await copyToClipboard(outputContent.textContent);
    if (success) {
        showToast('Release notes copied to clipboard!');
    }
});

// Copy functionality for CSS snippet
obsidianCss.addEventListener('click', async () => {
    if (obsidianCss.textContent.trim() === '') return;
    
    const success = await copyToClipboard(obsidianCss.textContent);
    if (success) {
        showToast('CSS class copied to clipboard!');
    }
});

// Copy to clipboard helper function
function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        textArea.remove();
        return true;
    } catch (err) {
        console.error('execCommand Error:', err);
        textArea.remove();
        return false;
    }
}

// Function to show toast message
function showToast(message) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    document.body.appendChild(container);

    // Function to remove toast
    const removeToast = () => {
        container.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(container);
        }, 300);
    };

    // Click anywhere to dismiss
    container.addEventListener('click', removeToast);

    // Auto dismiss after delay
    setTimeout(removeToast, 2000);
}
