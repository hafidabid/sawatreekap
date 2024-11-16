from openai import AzureOpenAI
from py_app_service.config import AZURE_AI_KEY, AZURE_ENDPOINT


def create_chat_completion(
    messages: str,
    model: str = "gpt-4o",
    memory: list = [],
    temperature: float = 0.0,
    openai_api_key: str = None,
    azure_endpoint: str = None,
):

    oai_keys = openai_api_key if openai_api_key is not None else AZURE_AI_KEY[0]
    client = AzureOpenAI(
        azure_endpoint=azure_endpoint if azure_endpoint is not None else AZURE_ENDPOINT,
        api_key=oai_keys,
        api_version="2024-08-01-preview",
        azure_deployment="onestappler",
    )
    response = client.chat.completions.create(
        model=model,
        messages=memory + [{"role": "user", "content": messages}],
        temperature=temperature,
    )

    return response.usage, response.choices[0].message.content


if __name__ == "__main__":
    create_chat_completion("test test broo")
