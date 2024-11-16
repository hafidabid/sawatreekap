import jwt
from fastapi.security import HTTPBearer
from fastapi import Depends, HTTPException, status
import traceback
from py_app_service.config import SECRET_KEY

OAuthSecurity = HTTPBearer()


def _load_jwt_data(token: str):
    token = token.replace("Bearer", "").strip()
    secret_key_jwt = SECRET_KEY
    payload = jwt.decode(token, secret_key_jwt, algorithms=["HS256"])

    return payload


async def jwt_middleware(token=Depends(OAuthSecurity)):
    try:
        return _load_jwt_data(token.credentials)
    except jwt.ExpiredSignatureError:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired"
        )
    except jwt.PyJWTError as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: {}".format(e),
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error: {}".format(e),
        )
