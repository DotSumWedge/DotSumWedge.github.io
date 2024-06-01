<script>
    import { writable } from 'svelte/store';
    import { tick } from 'svelte';
    import autosize from 'svelte-autosize';

    const genre_options = [
        { value: 'Fantasy', label: 'Fantasy: A world filled with magic, mythical creatures, and enchanted lands.' },
        { value: 'Sci-Fi', label: 'Sci-Fi: A futuristic or technologically advanced world, often set in space or involving advanced science.' },
        { value: 'Steampunk', label: 'Steampunk: A blend of historical and futuristic elements, often featuring steam-powered technology.' },
        { value: 'Horror', label: 'Horror: A world designed to evoke fear, featuring terrifying creatures, dark magic, and eerie atmospheres.' },
        { value: 'Other', label: 'Other:' }
    ];

    const world_tone_options = [
        { value: 'Epic', label: 'Epic: Grand adventures with world-ending stakes, serious, significant and earnest.' },
        { value: 'Adventurous', label: 'Adventurous: A mix of fun and lighthearted moments with the potential for deep emotional or dark scenes.' },
        { value: 'Mystical', label: 'Mystical: Enigmatic and enchanting, focusing on the mysterious and the magical.' },
        { value: 'Comedic', label: 'Comedic: Lighthearted and humorous, often not taking itself too seriously.' },
        { value: 'Grimdark', label: 'Grimdark: Bleak and gritty, where moral ambiguity prevails and hope is scarce.' },
        { value: 'Romantic', label: 'Romantic: Centered around personal relationships and emotions, potentially with a historical or fantastical twist.' },
        { value: 'Other', label: 'Other:' }
    ];

    const conflict_options = [
        { value: 'Instability', label: 'Instability: A shift in the world’s status quo.' },
        { value: 'Unfamiliarity', label: 'Unfamiliarity: Players encounter a strange and challenging environment.' }
    ];

    const threats_options = [
        { value: 'Invasion', label: 'Invasion: An external force threatening to conquer or destroy critical aspects of the world.' },
        { value: 'Corruption', label: 'Corruption: An insidious influence that corrupts individuals and institutions from within.' },
        { value: 'Natural Disaster', label: 'Natural Disaster: Frequent or significant environmental or magical cataclysms that challenge survival.' },
        { value: 'Political Intrigue', label: 'Political Intrigue: Power struggles and courtly machinations that ensnare the players in webs of deceit.' },
        { value: 'Ancient Evil', label: 'Ancient Evil: A long-forgotten evil that has awakened and poses a unique and catastrophic threat.' },
        { value: 'Rival Adventurers', label: 'Rival Adventurers: Other groups or influential individuals that compete against or oppose the players.' },
        { value: 'Other', label: 'Other:' }
    ];

    const quest_options = [
        { value: 'Artifact Recovery', label: 'Artifact Recovery: Quest to find and secure ancient and powerful artifacts.' },
        { value: 'Kingdom Building', label: 'Kingdom Building: Players are involved in establishing and growing a new settlement or kingdom.' },
        { value: 'Divine Conflict', label: 'Divine Conflict: Players are caught in the affairs of gods, possibly defending against a divine war or fulfilling prophecies.' },
        { value: 'Exploration', label: 'Exploration: Discovering new lands, civilizations, or dimensions previously unknown or inaccessible.' },
        { value: 'Revolution', label: 'Revolution: Leading or participating in an uprising against an oppressive regime or tyrant.' },
        { value: 'Mystery Solving', label: 'Mystery Solving: Unraveling a complex series of mysteries or crimes with significant implications.' },
        { value: 'Other', label: 'Other:' }
    ];

    const concept_level_options = [
        { value: 'High Concept', label: 'High Concept: Central idea dominates the narrative.' },
        { value: 'Low Concept', label: 'Low Concept: Focus on characters and storytelling.' }
    ];

    const world_setting_options = [
        { value: 'Urban', label: 'Urban: Cities and civilizations.' },
        { value: 'Rural', label: 'Rural: Wilderness and sparse settlements.' },
        { value: 'Mixed', label: 'Mixed: Blend of urban and rural elements.' }
    ];

    const magic_level_options = [
        { value: 'High Magic', label: 'High Magic: Magic is widespread and influential.' },
        { value: 'Medium Magic', label: 'Medium Magic: Magic is accessible but not all-pervasive; magical elements are significant but not overwhelming.' },
        { value: 'Low Magic', label: 'Low Magic: Magic is rare and mysterious.' }
    ];

    const campaignOptions = [
        'Dungeon', 'Boss Fight', 'Mystery', 'Wilderness Survival', 'Heist', 
        'Siege', 'Political Intrigue', 'Rescue Mission', 'Artifact Hunt', 
        'Festival', 'Haunted House', 'Mass Battle', 'Rebellion', 
        'Dragon Encounter', 'Celestial Event', 'Plague Outbreak', 
        'Prison Break', 'Assassination Plot', 'Alchemical Experiment Gone Wrong', 
        'Interplanar Travel', 'Natural Disaster', 'Tournament', 
        'Prophecy Fulfillment', 'Rival Adventurer Challenge', 'Elemental Chaos', 
        'Siege Defense', 'Deity\'s Return', 'Other'
    ];

    let selected_genre = genre_options[0];
    let genre_other_input = '';

    let selected_tone = world_tone_options[0];
    let world_tone_other_input = '';

    let selected_conflict = conflict_options[0];

    let selected_threat = threats_options[0];
    let threat_other_input = '';

    let selected_quest = quest_options[0];
    let quest_other_input = '';

    let selected_concept = concept_level_options[0];

    let selected_setting = world_setting_options[0];

    let selected_magic = magic_level_options[0];

    let additional_world_elements = '';

    let responseText = writable([]);

    let selectedText = writable(null);

    let isLoading = writable(false);

    let numDropdowns = writable(1);

    let showCampaignForm = writable(false);

    let campaignElements = writable(Array(1).fill('Dungeon'));
    let campaignOtherInputs = writable([]);
    let campaignEventDetails = writable([]);

    function handleTextareaClick(index) {
        selectedText.set(index);
        showCampaignForm.set(true);
    }

    function handleCampaignElementChange(event, index) {
        campaignElements.update(elements => {
            elements[index] = event.target.value;
            return elements;
        });
        if (event.target.value === 'Other') {
            campaignOtherInputs.update(inputs => {
                inputs[index] = '';
                return inputs;
            });
        } else {
            campaignOtherInputs.update(inputs => {
                inputs[index] = undefined;
                return inputs;
            });
        }
        campaignEventDetails.update(details => {
            details[index] = '';
            return details;
        });
    }

    async function handleCampaignOverviewSubmit(event) {
        event.preventDefault();

        console.log('Event Data:', event);
        
        // const finalCampaignElements = get(campaignElements).map((element, index) => {
        //     if (element === 'Other' && campaignOtherInputs[index]) {
        //         return campaignOtherInputs[index];
        //     }
        //     return element;
        // });

        // const campaignData = {
        //     elements: finalCampaignElements
        // };

        //console.log('Campaign Data:', campaignData);
        // Send campaignData to the server or process as needed
    }
    
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
     async function handleSubmit(event) {
        event.preventDefault(); // Prevent page refresh
        isLoading.set(true);

        const final_genre = selected_genre.value === 'Other' && genre_other_input ? `${genre_other_input}` : selected_genre.label;
        const final_tone = selected_tone.value === 'Other' && world_tone_other_input ? `${world_tone_other_input}` : selected_tone.label;
        const final_conflict = selected_conflict.label;
        const final_threat = selected_threat.value === 'Other' && threat_other_input ? `${threat_other_input}` : selected_threat.label;
        const final_quest = selected_quest.value === 'Other' && quest_other_input ? `${quest_other_input}` : selected_quest.label;
        const final_concept = selected_concept.label;
        const final_setting = selected_setting.label;
        const final_magic = selected_magic.label;
        const final_additional_world_elements = additional_world_elements;

        console.log('=== Form submitted ===');
        console.log('Submitted Genre:', final_genre);
        console.log('Submitted Tone:', final_tone);
        console.log('Submitted Conflict:', final_conflict);
        console.log('Submitted Threat:', final_threat);
        console.log('Submitted Quest:', final_quest);
        console.log('Submitted Concept Level:', final_concept);
        console.log('Submitted World Setting:', final_setting);
        console.log('Submitted Magic Level:', final_magic);
        console.log('Submitted Additional World Elements:', final_additional_world_elements);

        const formData = {
            genre: final_genre,
            tone: final_tone,
            conflict: final_conflict,
            threat: final_threat,
            quest: final_quest,
            concept: final_concept,
            setting: final_setting,
            magic: final_magic,
            additional_world_elements: final_additional_world_elements
        };

        const response = await fetch('http://localhost:5000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server Response:', result);
            if (Array.isArray(result.details)) {
                responseText.set(result.details);  // Directly set the response array
                await tick();  // Wait for the DOM to update
                const textareas = document.querySelectorAll('textarea');
                textareas.forEach(textarea => autosize.update(textarea));
            } else {
                responseText.set(['No detailed response received']);
            }
        } else {
            console.error('Failed to send data');
            responseText.set(['Failed to load data']);
        }
        isLoading.set(false);
    }
</script>

<div class="centered">
    <img
        src="/KatTheBardLogo.png"
        alt="Kat the Bard Logo"
    />
</div>

<div class="centered">
    <h1>World Building Questionnaire</h1>
</div>

<form on:submit={handleSubmit}>
    <div class="centered">
        <div class="centered">
            <label for="world-genre">What is the genre of your world?</label>
            <select id="world-genre" bind:value={selected_genre}>
                {#each genre_options as option}
                    <option value={option}>{option.label}</option>
                {/each}
            </select>
        </div>
        {#if selected_genre.value === 'Other'}
            <input type="text" placeholder="Specify other genre" bind:value={genre_other_input} />
        {/if}
    </div>      
    <div class="centered">
        <div class="centered">
            <label for="world-tone">What is your campaign's predominant mood or tone?</label>
            <select id="world-tone" bind:value={selected_tone}>
                {#each world_tone_options as option}
                    <option value={option}>{option.label}</option>
                {/each}
            </select>
        </div>
        {#if selected_tone.value === 'Other'}
            <input type="text" placeholder="Specify other mood or tone" bind:value={world_tone_other_input} />
        {/if}
    </div>
    <div class="centered">
        <label for="primary-conflict">What type of conflict drives the narrative in your world?</label>
        <select id="primary-conflict" bind:value={selected_conflict}>
            {#each conflict_options as option}
                <option value={option}>{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="centered">
        <div class="centered">
            <label for="active-threats">How do threats or villains actively engage with the players in your world?</label>
            <select id="active-threats" bind:value={selected_threat}>
                {#each threats_options as option}
                    <option value={option}>{option.label}</option>
                {/each}
            </select>
        </div>
        {#if selected_threat.value === 'Other'}
            <input type="text" placeholder="Specify other types of threats or villains" bind:value={threat_other_input} />
        {/if}
    </div>
    <div class="centered">
        <div class="centered">
            <label for="world-quest">What broad goal or quest is central to the campaign?</label>
            <select id="world-quest" bind:value={selected_quest}>
                {#each quest_options as option}
                    <option value={option}>{option.label}</option>
                {/each}
            </select>
        </div>
        {#if selected_quest.value === 'Other'}
            <input type="text" placeholder="Describe the overarching quest or objective for the players." bind:value={quest_other_input} />
        {/if}
    </div>
    <div class="centered">
        <label for="concept-level">Is your world's story high or low concept?</label>
        <select id="concept-level" bind:value={selected_concept}>
            {#each concept_level_options as option}
                <option value={option}>{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="centered">
        <label for="world-setting">What is the primary setting of your world?</label>
        <select id="world-setting" bind:value={selected_setting}>
            {#each world_setting_options as option}
                <option value={option}>{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="centered">
        <label for="magic-level">What is the prevalence of magic in your world?</label>
        <select id="magic-level" bind:value={selected_magic}>
            {#each magic_level_options as option}
                <option value={option}>{option.label}</option>
            {/each}
        </select>
    </div>
    <div class="centered">
        <div>
            <label for="additional-elements">Are there any additional details about the world or campaign that you want to include? For example, are there any specific races, creatures, or regional ecosystems you want to include?</label>
        </div>
        <input type="text" id="additional-elements" placeholder="Describe any specific elements or features"  style="margin: 20px 20px 0 20px; width: calc(100% - 40px);" bind:value={additional_world_elements}>
    </div>
    <div class="centered">
        <button type="submit" class="button" disabled={$isLoading}>
            <span>Generate World Summary</span>
            {#if $isLoading}
                <div class="spinner"></div>
            {/if}
        </button>
    </div>
</form>

{#each $responseText as detail, index}
    <textarea 
        rows="1" 
        readonly 
        bind:value={detail} 
        style="margin: 20px 20px 0 20px; width: calc(100% - 40px); overflow: hidden;" 
        class:selected={$selectedText === index} 
        on:click={() => handleTextareaClick(index)}
        use:autosize
    ></textarea>
{/each}

{#if $showCampaignForm}
    <form on:submit={handleCampaignOverviewSubmit} class="centered">
        <div class="centered">
            <label for="num-dropdowns">Number of Campaign Elements:</label>
            <select id="num-dropdowns" bind:value={$numDropdowns} on:change={() => {
                campaignElements.set(Array($numDropdowns).fill('Dungeon'));
                campaignEventDetails.set(Array($numDropdowns).fill(''));
            }}>
                {#each Array(7).fill(0).map((_, i) => i + 1) as num}
                    <option value={num}>{num}</option>
                {/each}
            </select>
        </div>
        {#each Array($numDropdowns).fill(0) as _, index}
            <div class="centered">
                <label for={`campaign-element-${index}`}>Campaign Element {index + 1}:</label>
                <select id={`campaign-element-${index}`} bind:value={$campaignElements[index]} on:change={(event) => handleCampaignElementChange(event, index)}>
                    {#each campaignOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
                {#if $campaignElements[index] === 'Other'}
                    <input type="text" placeholder="Specify other campaign element" bind:value={$campaignOtherInputs[index]} />
                {/if}
                <textarea placeholder="Details about the event" bind:value={$campaignEventDetails[index]}></textarea>
            </div>
        {/each}
        <button type="submit" class="button" disabled={$isLoading}>
            <span>Generate Campaign Overview</span>
            {#if $isLoading}
                <div class="spinner"></div>
            {/if}
        </button>
    </form>
{/if}

<style>
    .centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
    }

    .selected {
        border: 2px solid blue;
    }

    img {
        width: 280px;
        height: 280px;
    }

    h1 {
        text-align: center;
    }

    label {
        font-size: 1.2em;
        color: #333;
        margin-bottom: 5px;
    }

    select {
        font-size: 1.1em;
        color: #333;
        padding: 5px 10px;
        border-radius: 4px;
        text-align: center;
        width: fit-content;
    }

    input[type="text"] {
        width: 100%;
        font-size: 1.3em;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        text-align: center;
    }

    textarea {
        width: 100%;
        height: 10px;
        margin-top: 20px;
        font-size: 1.1em;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: none;
    }

    button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1em;
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .spinner {
        margin-left: 10px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-left-color: #fff;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
