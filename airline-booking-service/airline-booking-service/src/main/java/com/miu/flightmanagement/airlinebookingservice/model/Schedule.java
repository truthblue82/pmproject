package com.miu.flightmanagement.airlinebookingservice.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.OffsetDateTime;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scheduleId;

	@OneToOne(fetch = FetchType.EAGER)
	private Airport srcAirport;

	@OneToOne(fetch = FetchType.EAGER)
	private Airport dstnAirport;

	@Column(name = "departure_date")
//	@JsonFormat(pattern = "mm-dd-yyyy HH:mm:ss")
	private OffsetDateTime deptDateTime;

	@Column(name = "arrival_date")
//	@JsonFormat(pattern = "mm-dd-yyyy HH:mm:ss")
	private OffsetDateTime arrDateTime;

	/*
	 * Default constructor
	 */
	public Schedule() {

	}

	/*
	 * Parameterized constructor
	 */
	public Schedule(Long scheduleId, Airport srcAirport, Airport dstnAirport,
			OffsetDateTime deptDateTime, OffsetDateTime arrDateTime) {
		super();
		this.scheduleId = scheduleId;
		this.srcAirport = srcAirport;
		this.dstnAirport = dstnAirport;
		this.deptDateTime = deptDateTime;
		this.arrDateTime = arrDateTime;
	}


}
