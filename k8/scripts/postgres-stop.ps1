echo "stopping postgres...`n"

kubectl delete statefulset -n postgres postgres
echo "deleted postgres statefulset`n"

kubectl delete svc -n postgres postgres
echo "deleted postgres service`n"