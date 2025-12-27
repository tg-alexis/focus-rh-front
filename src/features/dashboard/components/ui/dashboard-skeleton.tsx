import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-5 w-5 rounded-full" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-20 mb-2" />
				<Skeleton className="h-3 w-32" />
			</CardContent>
		</Card>
	);
}

export function NextTaskCardSkeleton() {
	return (
		<Card className="border-2">
			<CardHeader>
				<Skeleton className="h-6 w-48" />
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-7 w-16 rounded-full" />
					<Skeleton className="h-7 w-24 rounded-full" />
				</div>
				<div>
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-4 w-full mb-1" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<Skeleton className="h-10 w-full rounded-md" />
			</CardContent>
		</Card>
	);
}

export function ProgressCircleSkeleton() {
	return (
		<Card className="bg-linear-to-br from-primary-50 to-secondary-50">
			<CardHeader>
				<Skeleton className="h-6 w-40" />
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<Skeleton className="w-48 h-48 rounded-full mb-6" />
				<div className="grid grid-cols-2 gap-4 w-full">
					<Skeleton className="h-20 rounded-lg" />
					<Skeleton className="h-20 rounded-lg" />
				</div>
			</CardContent>
		</Card>
	);
}

export function PillarProgressSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-48" />
			</CardHeader>
			<CardContent className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="space-y-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-4 w-12" />
						</div>
						<Skeleton className="h-2 w-full rounded-full" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function WeeklyCalendarSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-40" />
			</CardHeader>
			<CardContent className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="space-y-2">
						<Skeleton className="h-5 w-24 mb-2" />
						<div className="grid grid-cols-7 gap-2">
							{[1, 2, 3, 4, 5, 6, 7].map((j) => (
								<Skeleton key={j} className="h-10 w-full rounded-lg" />
							))}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function GamificationPanelSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-32" />
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-3">
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-2 w-full rounded-full" />
					<Skeleton className="h-4 w-40" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-5 w-32" />
					<div className="grid grid-cols-3 gap-2">
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} className="h-16 w-full rounded-lg" />
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
