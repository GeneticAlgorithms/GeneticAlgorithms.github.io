from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    azure_di_endpoint: str = Field(alias="AZURE_DI_ENDPOINT")
    azure_di_key: str = Field(alias="AZURE_DI_KEY")
    model_id: str = Field(default="prebuilt-layout", alias="MODEL_ID")
    max_concurrency: int = Field(default=8, alias="MAX_CONCURRENCY")
    request_timeout_seconds: int = Field(default=160, alias="REQUEST_TIMEOUT_SECONDS")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
