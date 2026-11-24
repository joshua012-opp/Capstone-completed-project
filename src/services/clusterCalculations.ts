import type { Cluster, ClusterSpecificationsDisplay, ClusterSummary, PropertyType, UnitStats } from '../types/serenia';

export function deriveClusterSummary(cluster: Cluster, types: PropertyType[]): ClusterSummary {
  const clusterTypes = types.filter((type) => type.clusterId === cluster.id);
  const totalUnits = clusterTypes.length > 0
    ? clusterTypes.reduce((sum, type) => sum + type.totalUnit, 0)
    : cluster.specs.estimatedUnits;
  const sold = cluster.unitStatus.sold;
  const onRepair = cluster.unitStatus.onRepair;
  const unitStats: UnitStats = {
    total: totalUnits,
    sold,
    onRepair,
    available: totalUnits - sold - onRepair,
  };
  const typePrices = clusterTypes.map((type) => type.pricing.basePrice);

  return {
    totalTypes: clusterTypes.length > 0 ? clusterTypes.length : cluster.specs.estimatedTypes,
    totalUnits,
    priceFrom: typePrices.length > 0 ? Math.min(...typePrices) : null,
    unitStats,
  };
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function rangeLabel(values: number[], unit: string): string {
  if (values.length === 0) return `0 ${unit}`;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min} ${unit}` : `${min}-${max} ${unit}`;
}

export function getSpecificationsDisplay(cluster: Cluster, types: PropertyType[]): ClusterSpecificationsDisplay {
  const clusterTypes = types.filter((type) => type.clusterId === cluster.id);
  const largest = clusterTypes.reduce<PropertyType['unitSize'] | null>((current, type) => {
    if (!current) return type.unitSize;
    const currentSqm = current.value * (current.unit === 'ft²' ? 0.092903 : 1);
    const candidateSqm = type.unitSize.value * (type.unitSize.unit === 'ft²' ? 0.092903 : 1);
    return candidateSqm > currentSqm ? type.unitSize : current;
  }, null);
  const maxFloors = clusterTypes.reduce((max, type) => Math.max(max, type.floors), 0);

  return {
    landAndBuildingSize: largest
      ? `${formatNumber(largest.value)} ${largest.unit}`
      : `${formatNumber(cluster.specs.singleFloorSize)} m²`,
    houseStyle: cluster.specs.clusterType,
    totalFloor: maxFloors <= 1 ? 'Single floor' : maxFloors === 2 ? 'Double floor' : `${maxFloors} floors`,
    bedrooms: rangeLabel(clusterTypes.map((type) => type.bedrooms), 'bedrooms'),
    bathrooms: rangeLabel(clusterTypes.map((type) => type.bathrooms), 'bathrooms'),
    floorType: cluster.specs.floorType,
    stairs: cluster.specs.stairs || '-',
    doorWindow: cluster.specs.doorWindowType,
    electricityCapacity: `${formatNumber(cluster.specs.electricityCapacityVa)} VA`,
    specialAmenities: `${cluster.amenities.custom.length} amenities`,
  };
}
