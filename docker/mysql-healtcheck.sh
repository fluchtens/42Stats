mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$MYSQL_DATABASE';" | grep "$MYSQL_DATABASE" > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ La base de données $MYSQL_DATABASE existe."
  exit 0
else
  echo "❌ La base de données $MYSQL_DATABASE n'existe pas."
  exit 1
fi
