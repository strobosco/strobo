cd ..\redis
echo "starting redis...`n"

echo "redis master and slaves...`n"

kubectl create ns redis
echo "redis ns ok`n"

kubectl apply -n redis -f ./redis/redis-configmap.yaml
echo "redis configmap ok`n"

kubectl apply -n redis -f ./redis/redis-statefulset.yaml
echo "redis statefulset ok`n"

Start-Sleep -s 15

kubectl apply -n redis -f ./sentinel/sentinel-statefulset.yaml
echo "sentinel statefulset ok`n"

cd ..\scripts

kubectl get all -n redis