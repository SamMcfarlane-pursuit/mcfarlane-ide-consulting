// Standalone integrations (Base44-free)

/**
 * Stub for InvokeLLM - returns placeholder analysis
 * Can be replaced with browser-based AI or external API later
 */
export const InvokeLLM = async ({ prompt, file_urls, response_json_schema }) => {
    console.log('InvokeLLM called (stubbed):', { prompt: prompt?.slice(0, 100) });

    // Return a basic placeholder response
    return {
        title: '',
        description: 'Project imported successfully. Edit to add details.',
        category: 'Web Development',
        technologies: [],
        highlights: [],
        readme_content: null,
        year: new Date().getFullYear(),
        status: 'completed'
    };
};

/**
 * Upload file to browser memory (creates blob URL)
 * Files are stored locally - they persist as long as the page is open
 */
export const UploadFile = async ({ file }) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a blob URL for the file
            const blobUrl = URL.createObjectURL(file);
            resolve({ file_url: blobUrl });
        } catch (error) {
            reject(error);
        }
    });
};
