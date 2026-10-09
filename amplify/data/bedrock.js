export function request(ctx) {
    const { ingredients = [] } = ctx.args;
 
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;
 
    return {
        // Use the clean base model ID that worked in your playground
        resourcePath: `/model/anthropic.claude-haiku-4-5-20251001-v1:0/invoke`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        },
    };
}
 
export function response(ctx) {
    const parsedBody = JSON.parse(ctx.result.body);
    
    if (parsedBody.message || parsedBody.error) {
        return {
            error: JSON.stringify(parsedBody),
        };
    }

    return {
        body: parsedBody.content[0].text,
    };
}