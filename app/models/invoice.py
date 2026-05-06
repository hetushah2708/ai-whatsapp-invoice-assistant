from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.db.database import Base


class Invoice(Base):

    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    ocr_text = Column(Text)

    structured_data = Column(Text)

    status = Column(String)