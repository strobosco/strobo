echo "stopping redis...`n"

kubectl delete statefulset -n redis redis
echo "deleted redis statefulset`n"

kubectl delete statefulset -n redis sentinel
echo "deleted sentinel statefulset`n"